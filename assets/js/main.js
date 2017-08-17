topoli.init();

document.getElementsByClassName("add-vertex")[0].addEventListener(
  "click",
  () => {
    let div = document.createElement("div"),
      vInp = document.createElement("input"),
      eInp = document.createElement("input"),
      dBtn = document.createElement("button");
    vInp.classList.add("vertex-input");
    vInp.setAttribute("name", "vertex[]");
    vInp.setAttribute("type", "text");
    eInp.classList.add("edge-input");
    eInp.setAttribute("name", "edges[]");
    eInp.setAttribute("type", "text");
    dBtn.classList.add("del-vertex");
    dBtn.setAttribute("type", "button");
    dBtn.textContent = "X";
    dBtn.addEventListener(
      "click",
      () => dBtn.parentNode.remove(),
      false
    );
    div.appendChild(vInp);
    div.appendChild(eInp);
    div.appendChild(dBtn);
    document.getElementsByClassName("inp-group")[0].appendChild(div);
  },
  false
);
document.getElementsByClassName("sub-btn")[0].addEventListener(
  "click",
  () => {
    let i, old = document.getElementsByClassName("vertex");
    for (i = 0; i < old.length; i += 1) old[i].remove();
    const form = new FormData(document.getElementsByClassName("topoli-form")[0]);
    let graph = {};
    form.getAll("vertex[]").forEach((val, i) => {
      if (form.getAll("edges[]")[i].length > 0)
        graph[val.toUpperCase()] = new Set(
          form.getAll("edges[]")[i].toUpperCase().split(",")
        );
      else
        graph[val.toUpperCase()] = new Set();
    });
    topoli.draw(topoli.tarjan(graph), graph);
  },
  false
);