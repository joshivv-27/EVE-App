
// Global Variable-------------------------------------->

let Data = []

// Cloud Storage Function of Data-------------------------------------->

const uploadData = () => {
  let a = JSON.parse(localStorage.getItem('AppData'))
  if (a === null) {
    alert('scan data')
  } else {
    const option = {
      method: 'POST',
      body: JSON.stringify(a),
      headers: {
        'Content-Type': 'application/JSON',
      },
    }
    fetch('https://sleepy-savannah-80270.herokuapp.com/SaveToCloud', option)
      .then((resp) => resp.json)
      .then((data) => alert('Data saved in "My Events"'))
    localStorage.removeItem('AppData')
    Data = []
  }
}

// Scanner Function-------------------------------------->

const takePicture = () => {
  cordova.plugins.barcodeScanner.scan(
    function (result) {
      LocalStorageAfter(JSON.parse(result.text))
      alert('QR scanned successfully.')
    },
    function (error) {
      alert('Scanning failed: ' + error)
    },
    {
      preferFrontCamera: false, // iOS and Android
      preferBackCamera: true, // iOS and Android
      showFlipCameraButton: true, // iOS and Android
      showTorchButton: true, // iOS and Android
      torchOn: false, // Android, launch with the torch switched on (if available)
      saveHistory: true, // Android, save scan history (default false)
      prompt: 'Place a barcode inside the scan area', // Android
      resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
      formats: 'QR_CODE,PDF_417', // default: all but PDF_417 and RSS_EXPANDED
      orientation: '', // Android only (portrait|landscape), default unset so it rotates with the device
      disableAnimations: true, // iOS
      disableSuccessBeep: false, // iOS and Android
    }
  )
}

// Data Loader-------------------------------------->

const spinner = document.getElementById('cover-spin')

function showSpinner() {
  spinner.className = 'show'
}

function hideSpinner() {
  spinner.className = spinner.className.replace('show', '')
}

// Local Storage-------------------------------------->

const clickHandlerLocal = () => {
  let a = ''
  let Data = JSON.parse(localStorage.getItem('AppData'))
  if (Data === null) {
    document.querySelector('.cardHolder').innerHTML = `<div>
    <img src="./img/no-data-concept-illustration_114360-2506.jpg" alt="loading">
    </div>
`
  } else {
    Data.forEach((node) => {
      let HTML = document.createElement('div')
      HTML.classList.add('card')
      HTML.innerHTML = `
          <div "class="imgHolder">
            <img src="${node.src}" alt="${node.name}">
          </div>
          <div class="textHolder">
            <h3> ${node.name}</h3>
            <h3>${node.date}</h3>
            <div class="parent"><button onclick="discriptionToggle()" class=" ui-btn
            ui-corner-all
            ui-shadow
            ui-btn-inline
            ui-btn-a">Read More</button>
            <div class="close modal">
            <div class="modal-content">
            <div class="imgHolder">
              <img src="${node.src}" alt="${node.name}">
            </div>
             <div class="textHolder">
            <h3> ${node.name}</h3>
            <h3>${node.date}</h3>
            
            <h3>Description:</h3>
            <p class="emphasis">${node.description}</p>

          </div>
            </div>
            </div>
          </div>`
      a = a + HTML.outerHTML
    })
    document.querySelector('.cardHolder').innerHTML = `${a}`
  }
}

// Data Coming from the Cloud Function-------------------------------------->

const clickHandlerCloud = () => {
  showSpinner()
  fetch('https://sleepy-savannah-80270.herokuapp.com/CloudData')
    .then((resp) => resp.json())
    .then((data) => {
      hideSpinner()
      cloudUI(data.data)
    })
}

const cloudUI = (data) => {
  let a = ''
  if (data === null) {
    document.querySelector(
      '.cardHolderCloud'
    ).innerHTML = `<p>Scan and include the best titles</p>`
  } else {
    data.forEach((node) => {
      let HTML = document.createElement('div')
      HTML.classList.add('card')
      HTML.innerHTML = `
           <div "class="imgHolder">
            <img src="${node.src}" alt="${node.name}">
          </div>
          <div class="textHolder">
            <h3> ${node.name}</h3>
            <h3>${node.date}</h3>
            <div class="parent"><button onclick="discriptionToggle()" class=" ui-btn
            ui-corner-all
            ui-shadow
            ui-btn-inline
            ui-btn-a">Read More</button>
            <div class="close modal">
            <div class="modal-content">
            <div class="imgHolder">
              <img src="${node.src}" alt="${node.name}">
            </div>
             <div class="textHolder">
            <h3> ${node.name}</h3>
            <h3>${node.date}</h3>
            
            <h3>Description:</h3>
            <p class="emphasis">${node.description}</p>

          </div>
            </div>
            </div>
          </div>`
      a = a + HTML.outerHTML
    })
    document.querySelector('.cardHolderCloud').innerHTML = `${a}`
  }
}

// Discription Toggle-------------------------------------->

const discriptionToggle = () => {
  let a = event.target.parentElement.children[1]
  if (a.classList[0] === 'close') {
    a.style.display = 'block'
  } else {
    a.style.display = 'none'
  }
}

//On click Events-------------------------------------->

window.onclick = function (event) {
  let a = event.target
  if (event.target.classList[0] === 'close') {
    a.style.display = 'none'
  }
}

// Delete Local Data Function-------------------------------------->

const deleteLocalData = () => {
  Data = []
  localStorage.clear()
  alert('Local data deleted.')
}

// Delete Cloud Data Function-------------------------------------->

const deleteCloudData = () => {
  fetch('https://sleepy-savannah-80270.herokuapp.com/DataClearCloud')
    .then((resp) => resp.json())
    .then((data) => alert(data.data))
  alert('Cloud data deleted.')
}

// Local Storage Function-------------------------------------->

const LocalStorageAfter = (data) => {
  Data.push(data)
  console.log(Data)
  localStorage.setItem('AppData', JSON.stringify(Data))
}

// On ready Function-------------------------------------->

const onDeviceReady = () => { }

document.addEventListener('deviceready', onDeviceReady, false)

// Today List-------------------------------------->

$(document).on("pageinit", "#foo", function (event) {

  let a = ''
  let HTML = document.createElement('div')
  HTML.classList.add('card')

  let i = 0;
  let j = 0;
  
// Let todayDate = "07-06-2021";-------------------------------------->
  
  let todayDate = new Date();
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let m = months[todayDate.getMonth()];
  let dt = todayDate.getDate();
  let yr = todayDate.getFullYear();
  let str = m + " " + dt + ", " + yr;
  console.log('date: ' + str);

// Getting Local Data -------------------------------------->

  let Data = JSON.parse(localStorage.getItem('AppData'))

  if (Data == null) {
    HTML.innerHTML = `
          <div class="textHolder">
            <center>
              <p>No data in local storage</p>            
            </center>
          </div>`

    a = HTML.outerHTML;
  } else {
    Data.forEach((node) => {

      let d = node.date;

      if (d.includes(str)) {
        i = i + 1;
      }
    })

    if (i > 0) {
      HTML.innerHTML = `
            <div class="textHolder">
            <center>
              <a onclick='clickHandlerLocal()' href='#data-local'>
              <p>today we have ${i} event(s) - local</p>
              </a>
              </center>
            </div>`

    } else {
      HTML.innerHTML = `
            <div class="textHolder">
            <center>
              <p>No event to attend today.</p>
            </center>
            </div>`
    }

  }

  a = HTML.outerHTML;

  document.querySelector('.cardHolderHome').innerHTML = `${a}`
});


// Save Data From Local Storage-------------------------------------->

$(document).on("pageinit", "#login", function (event) {

  if (localStorage.getItem("formdata") != null) {
    let udata = JSON.parse(localStorage.formdata);

    if (udata != null) {
      let seg = udata[0];
      let fname = seg["fname"];
      if (fname != "") {
        window.location.replace("#foo");
      }
    }
  }
  var dataArray = [];

  $("#btnSubmit").on("click", function (event, ui) {

// Validation From , Login Registration-------------------------------------->
    var number = /^[0-9]+$/;

    let lsfname = $('#fname').val();
    let lslname = $('#lname').val();
    let lsstate = $('#state').val();
    let lsemail = $('#email').val();
    let lsage = $('#age').val();

    if (lsfname != "" && lslname != "" && lsstate != "def" && lsemail != "" && lsage != "" && lsage > 0 && lsage < 120 && lsage.match(number)) {

      var tmp = { fname: lsfname, lname: lslname, state: lsstate, email: lsemail, age: lsage };
      dataArray.push(tmp);
      localStorage.formdata = JSON.stringify(dataArray);
      clearFields();
      alert("Your Information has been saved");

    } else {
      alert("Enter valid data");
    }

  }); // end btnSubmit



  $("#btnClear").on("click", function (event, ui) {

    clearFields();

  }); // end btnSubmit

// Clear all fields function -------------------------------------->
  function clearFields() {

    $('#fname').val('');
    $('#lname').val('');
    $('#state').val("def");
    $('#email').val('');
    $('#age').val('');
  }


});// ---------------------------------------------------

// View Data From Validation Form -------------------------------------->

$(document).on("pageinit", "#myprofile", function (event) {

  let html = '';
  let htmlSegment = "";

  var i;
  let data = JSON.parse(localStorage.formdata);
  for (i = 0; i < data.length; i++) {
    let seg = data[i];
    let fname = seg["fname"];
    let lname = seg["lname"];
    let state = seg["state"];
    let email = seg["email"];
    let age = seg["age"];

    htmlSegment = "<tr>";
    htmlSegment += "<td>" + fname + "</td>" +
      "<td>" + lname + "</td>" +
      "<td>" + state + "</td>" +
      "<td>" + email + "</td>" +
      "<td>" + age + "</td>";
    htmlSegment += '</tr>';
    html += htmlSegment;
  }

  $('.fdata').append(html);

  // }); // end dataLocalStorage ==============================================


});// ---------------------------------------------------