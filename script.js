let mesas = JSON.parse(localStorage.getItem("mesas")) || {};
let faturamento = Number(localStorage.getItem("faturamento")) || 0;
let totalPedidosDia = Number(localStorage.getItem("totalPedidosDia")) || 0;

function salvarDados() {
  localStorage.setItem("mesas", JSON.stringify(mesas));
  localStorage.setItem("faturamento", faturamento);
  localStorage.setItem("totalPedidosDia", totalPedidosDia);
}

function adicionarPedido() {
  let numeroMesa = document.getElementById("mesa").value;
  let produto = document.getElementById("produto");

  if (numeroMesa === "") {
    alert("Informe o número da mesa!");
    return;
  }

  let valor = Number(produto.value);
  let nomeProduto = produto.options[produto.selectedIndex].text;

  if (!mesas[numeroMesa]) {
    mesas[numeroMesa] = {
      pedidos: [],
      total: 0
    };
  }

  mesas[numeroMesa].pedidos.push(nomeProduto);
  mesas[numeroMesa].total += valor;
  totalPedidosDia++;

  atualizarTela(numeroMesa);
  salvarDados();
}

function atualizarTela(mesa) {
  let lista = document.getElementById("listaPedidos");
  if (!lista) return;

  lista.innerHTML = "";

  mesas[mesa].pedidos.forEach(item => {
    let li = document.createElement("li");
    li.textContent = item;
    lista.appendChild(li);
  });

  document.getElementById("total").textContent = mesas[mesa].total;
}

function fecharConta() {
  let numeroMesa = document.getElementById("mesa").value;

  if (!mesas[numeroMesa]) {
    alert("Essa mesa não tem pedidos!");
    return;
  }

  faturamento += mesas[numeroMesa].total;

  alert("Conta da Mesa " + numeroMesa +
        " fechada!\nTotal: R$ " + mesas[numeroMesa].total);

  delete mesas[numeroMesa];

  document.getElementById("listaPedidos").innerHTML = "";
  document.getElementById("total").textContent = "0";

  salvarDados();
}

function zerarDia() {
  if (confirm("Tem certeza que deseja zerar o dia?")) {
    faturamento = 0;
    totalPedidosDia = 0;
    mesas = {};
    salvarDados();
    atualizarAdmin();
  }
}

function atualizarAdmin() {
  if (document.getElementById("faturamento")) {
    document.getElementById("faturamento").textContent = faturamento;
    document.getElementById("mesasAtendidas").textContent = Object.keys(mesas).length;
    document.getElementById("totalPedidos").textContent = totalPedidosDia;
  }
}

atualizarAdmin();
