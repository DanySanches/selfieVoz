var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function start() {
  document.getElementById("textbox").innerHTML = "";
  recognition.start();
}

recognition.onresult = function(event) {
  console.log(event);

  var Content = event.results[0][0].transcript;

  document.getElementById("textbox").innerHTML = Content;
  console.log(Content);

  // adicionamos o  if para  saber se  o  usuário  falou tire minha selfie
  if (Content == "tire minha selfie") {
    console.log("tirando selfie --- ");
    speak();
  }
}

function speak() {
  var synth = window.speechSynthesis;
  // colocar o  speak_data para dizer tirando sua fot em 5s
  speak_data = "Tirando sua selfie em 5 segundos";
  //   speak_data = document.getElementById("textbox").value;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  Webcam.attach(camera);

  setTimeout(function () {
    // para que a  foto demore 5 seg para ser tirada a função take_snapshot de ser chamada dentro de  setTimeout
    take_snapshot();
    save();
  }, 5000);
}

camera = document.getElementById("camera");
Webcam.set({
  width: 360,
  height: 250,
  image_format: "jpeg",
  jpeg_quality: 90,
})

// função  tirar  foto
function take_snapshot() {
  
  Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML =
      '<img id="selfie_image" src="' + data_uri + '"/>';
  });
}

//  função salvar
function save() {
  link = document.getElementById("link");
  image = document.getElementById("selfie_image").src;
  link.href = image;
  link.click();
}
