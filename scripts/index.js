// Skills Section (Folder Structure)

document.getElementById("hierarchyGeneral").addEventListener("click", hideShowEvent);
document.getElementById("hierarchyWeb").addEventListener("click", hideShowEvent);
document.getElementById("hierarchyDatabase").addEventListener("click", hideShowEvent);

function hideShowEvent(event){
  var elem = event.target;
  if(elem.tagName.toLowerCase() == "span" && elem !== event.currentTarget)
  {
      var type = elem.classList.contains("folder") ? "folder" : "file";
      if(type=="folder")
      {
          var isexpanded = elem.dataset.isexpanded=="true";
          elem.dataset.isexpanded = !isexpanded;

          var toggleelems = [].slice.call(elem.parentElement.children);
          var classnames = "file,foldercontainer,noitems".split(",");

          toggleelems.forEach(function(element){
              if(classnames.some(function(val){return element.classList.contains(val);}))
              element.style.display = isexpanded ? "none":"block";
          });
      }
  }
}

var checkbox = document.querySelector('input[name=theme]');
checkbox.addEventListener('change', function() {
    if (this.checked) {
        trans();
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
});

let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}
