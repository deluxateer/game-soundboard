
// var $ = require ('jquery');

window.addEventListener("load", function(){
  // $(document).ready(function() {
  const tablinks = document.querySelectorAll('.tablinks');
  const tabcontent = document.querySelectorAll('.tabcontent');
  let currSection;

  function clearActive() {
    tablinks.forEach(tab => { tab.className = tab.className.replace(" active", ""); });
  }

  function openSection(evt, section) {
    currSection = section;

    // Get all elements with class="tabcontent" and hide them
    tabcontent.forEach(tab => { tab.style.display = "none"; });

    // Get all elements with class="tablinks" and remove the class "active"
    clearActive();

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.querySelector(`#${section}`).style.display = "block";
    evt.currentTarget.className += " active";
  }

  tablinks.forEach(tab => {
    tab.addEventListener("click", function(e) { openSection(e, tab.innerHTML); });
    // console.log('tab listeners hooked');
    // });

    // window.onresize = function() {
    //   clearActive();
    //   tabcontent.forEach(tab => {
    //     tab.style.display = "block";
    //   });
    //   document.querySelector(`[data-name='${currSection}']`).click();
    // };

    // Get the element with id="defaultOpen" and click on it
    document.getElementById("defaultOpen").click();
  });
},false);
