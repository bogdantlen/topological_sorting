const topoli = {
  examples: [{
    "D": new Set(["E"]),
    "E": new Set(),
    "C": new Set(["D", "E"]),
    "B": new Set(["D"]),
    "A": new Set(["C", "B", "D", "E"])
  }, {
    "pants": new Set(["belt", "shoes"]),
    "tie": new Set(["jacket"]),
    "socks": new Set(["shoes"]),
    "belt": new Set(["jacket"]),
    "shirt": new Set(["tie"]),
    "undershorts": new Set(["pants", "shoes"]),
    "watch": new Set(),
    "shoes": new Set(),
    "jacket": new Set()
  }],
  id: "topoli",
  colors: ["red", "green", "blue", "orange", "grey", "yellow", "cyan", "limegreen", "maroon"],
  noIncoming(g) {
    const gKeys = Object.keys(g);
    return gKeys.filter(i => gKeys.filter(x => g[x].has(i)).length === 0);
  },
  kahn(g) {
    let S = this.noIncoming(g);
    if (S.length > 0) {
      let L = [];
      while (S.length > 0) {
        const n = S.pop();
        L.push(n);
        delete g[n];
        S = this.noIncoming(g);
      }
      return L;
    } else return "Graph has at least one cycle";
  },
  tarjan(g) {
    let white = Object.keys(g),
      grey = new Set(),
      L = [];
    const visit = n => {
      if (grey.has(n)) {
        return "Graph has at least one cycle";
      } else if (L.indexOf(n) === -1) {
        grey.add(n);
        g[n].forEach(m => visit(m));
        grey.delete(n);
        L.push(n);
      }
    };
    while (white.length > 0) visit(white.pop());
    return L.reverse();
  },
  init() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
      defs = document.createElementNS("http://www.w3.org/2000/svg", "defs"),
      marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svg.id = `${this.id}-svg`;
    svg.setAttribute("viewBox", "0 0 500 100");
    marker.id = "arrow";
    marker.setAttribute("markerWidth", 10);
    marker.setAttribute("markerHeight", 10);
    marker.setAttribute("refX", 0);
    marker.setAttribute("refY", 3);
    marker.setAttribute("orient", "auto");
    marker.setAttribute("markerUnits", "strokeWidth");
    path.setAttribute("d", "M0,0 L0,6 L9,3 z");
    marker.appendChild(path);
    defs.appendChild(marker);
    svg.appendChild(defs);
    document.getElementsByClassName(`${this.id}`)[0].appendChild(svg);
  },
  draw(seq, orig) {
    let circleX = 25,
      textX = 5,
      lineStart = 40,
      lineEnd = 55,
      curvStart = 25,
      curvEnd = 15,
      amplitude = 90;
    seq.forEach((elem, i) => {
      let g = document.createElementNS("http://www.w3.org/2000/svg", "g"),
        circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
        text = document.createElementNS("http://www.w3.org/2000/svg", "text");
      g.classList.add("vertex");
      circle.setAttribute("cx", circleX);
      circle.setAttribute("cy", 50);
      circle.setAttribute("r", 15);
      circle.setAttribute("stroke", this.colors[i]);
      text.setAttribute("x", `${textX}%`);
      text.setAttribute("y", "20%");
      text.textContent = elem;
      g.appendChild(circle);
      g.appendChild(text);
      if (seq[i + 1] !== undefined) {
        let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", lineStart);
        line.setAttribute("x2", lineEnd);
        line.setAttribute("y1", 50);
        line.setAttribute("y2", 50);
        line.setAttribute("stroke", this.colors[i]);
        g.appendChild(line);
        orig[elem].forEach((val) => {
          if (seq[i + 1] !== val) {
            const multiplier = seq.indexOf(val);
            let curve = document.createElementNS("http://www.w3.org/2000/svg", "path");
            curve.classList.add("curve");
            curve.setAttribute("stroke", this.colors[i]);
            curve.setAttribute("d", `M${curvStart} 65 Q ${curvStart + 25} ${amplitude}\
            ${curvEnd + 60 * multiplier} 68`);
            g.appendChild(curve);
          }
        });
        amplitude += 10;
      }
      document.getElementById(`${this.id}-svg`).appendChild(g);
      circleX += 60;
      textX += 12;
      lineStart += 60;
      lineEnd += 60;
      curvStart += 60;
    });
  }
};