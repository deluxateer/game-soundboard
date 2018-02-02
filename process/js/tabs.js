function openCity(evt, cityName) {

    // Get all elements with class="tabcontent" and hide them
    const tabcontent = document.querySelectorAll('.tabcontent');
    tabcontent.forEach(tab => {
      tab.style.display = "none";
    });

    // Get all elements with class="tablinks" and remove the class "active"
    const tablinks = document.querySelectorAll('.tablinks');
    tablinks.forEach(tab => {
      tab.className = tab.className.replace(" active", "");
    });

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.querySelector(`#${cityName}`).style.display = "block";
    evt.currentTarget.className += " active";
  }

  const buttons = document.querySelectorAll('.tab button');

  buttons.forEach(button => {
    button.addEventListener("click", function(e) {
      openCity(e, button.innerHTML);
    });
  });

  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();
