function component() {
  const el = document.getElementById('app')
  //var element = document.createElement('p');

  const p = document.createElement("p");
  const msg = "Hello World";
  p.innerHTML = msg;

  el.appendChild(p);

  // const node = document.createElement("p");                 // Create a <li> node
  // const textnode = document.createTextNode("Hello World");         // Create a text node
  // node.appendChild(textnode);                              // Append the text to <li>
  // document.getElementById("app").appendChild(node);
}

component();
