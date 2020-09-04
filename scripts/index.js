// Animated Scroll
$(document).ready(function(){
    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 800, function(){
        
            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
        } // End if
    });
});



// Skills Section (Folder Structure)
document.getElementById("hierarchyGeneral").addEventListener("click", hideShowEvent);
document.getElementById("hierarchyWeb").addEventListener("click", hideShowEvent);
document.getElementById("hierarchyDatabase").addEventListener("click", hideShowEvent);

function hideShowEvent(event){
  var elem = event.target;
  if (elem.tagName.toLowerCase() == "span" && elem !== event.currentTarget) {
    var type = elem.classList.contains("folder") ? "folder" : "file";
    if (type=="folder") {
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



// Light-Dark Theme
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


// OnloadEvents()
function onloadEvents() {
    // AOS Scroll Animation
    AOS.init();
    
    // Carousel Height
    setCarouselHeight();
}


// Carousel Height
function setCarouselHeight() {
    var pennHeight = document.getElementById('pennInfo').clientHeight;
    document.getElementById("activities").style.maxHeight = `${pennHeight}px`;

    var lst = document.getElementsByClassName("carousel-img");
    for (var i = 0; i < lst.length; i++) {
        lst[i].style.height = pennHeight+"px";
    }
}

// Responsive resizing of carousel
$(window).resize(function(){
    winWidth = $(window).width();
    setCarouselHeight();
});