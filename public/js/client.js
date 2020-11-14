
const weatherform = document.querySelector("form");
const searchelement = document.querySelector("input");
const messageone = document.querySelector("#message1");
const messagetwo = document.querySelector("#message2");

weatherform.addEventListener("submit", (event) => {
  event.preventDefault(); //to prevent auto-refresh
  const location = searchelement.value; //extracts the input value that is typed in
  messageone.textContent = "loadin...";
  messagetwo.textContent = "";
  fetch("http://localhost:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageone.textContent = data.error;
        } else {
          messageone.textContent = data.location;
          messagetwo.textContent =
            "The temperature is (in Kelvin) - " +
            data.forecast.temperature +
            " and the humidity is (in percentage) - " +
            data.forecast.humidity;
        }
      });
    }
  );
});
