const information = document.getElementById('info');
information.innerText = `${versions.appname()} (v${versions.appversion()}) is  using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;
