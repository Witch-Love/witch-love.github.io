document.addEventListener('DOMContentLoaded', function() {
    if (window.location.href.includes("umineko")) {
      var u_sc = document.querySelector("a[href^='https://github.com/Witch-Love/umineko-scripting-tr/releases/']");
  
      if (u_sc) {
        fetch('https://api.github.com/repos/Witch-Love/umineko-scripting-tr/releases/latest')
          .then(response => response.json())
          .then(data => {
            const latestVersion = data.tag_name;
            u_sc.innerHTML = u_sc.innerHTML + " (<b>" + latestVersion + "</b>)";
          })
          .catch(error => console.error("Error fetching Umineko script data:", error));
      }
  
      var u_fi = document.querySelector("a[href^='https://github.com/Witch-Love/umineko-scripting-tr-files/releases/']");
  
      if (u_fi) {
        fetch('https://api.github.com/repos/Witch-Love/umineko-scripting-tr-files/releases/latest')
          .then(response => response.json())
          .then(data => {
            const latestVersion = data.tag_name;
            u_fi.innerHTML = u_fi.innerHTML + " (<b>" + latestVersion + "</b>)";
          })
          .catch(error => console.error("Error fetching Umineko graphics data:", error));
      }
    }/* else if (window.location.href.includes("higurashi")) {
      var h_sc = document.querySelector("a[href^='https://github.com/Witch-Love/higurashi-scripting-tr/releases/']");
  
      if (h_sc) {
        fetch('https://api.github.com/repos/Witch-Love/higurashi-scripting-tr/releases/latest')
          .then(response => response.json())
          .then(data => {
            const latestVersion = data.tag_name;
            h_sc.innerHTML = h_sc.innerHTML + " (<b>" + latestVersion + "</b>)";
          })
          .catch(error => console.error("Error fetching Higurashi script data:", error));
      }
    }*/
  });