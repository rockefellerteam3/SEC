let taps_btn = document.querySelectorAll(".taps .tap_btn");
let taps_content = document.querySelectorAll(".taps_content .content");
var line_tap = document.querySelector(".taps .line");

taps_btn.forEach((btn, index) => {
    btn.addEventListener("click", () => {

        taps_btn.forEach(item => item.classList.remove("active"));
        btn.classList.add("active");

        line_tap.style.width = btn.offsetWidth + "px";

        let parentWidth = btn.parentElement.offsetWidth;
        let rightValue = parentWidth - (btn.offsetLeft + btn.offsetWidth);

        line_tap.style.right = rightValue + "px";

        taps_content.forEach(item => item.classList.remove("active"));
        taps_content[index].classList.add("active");
    });
});



let password = document.getElementById("password");
let showPassword = document.getElementById("showPassword");

showPassword.addEventListener("click", () => {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';

    password.setAttribute('type', type);

    if (password.getAttribute('type') === "password") {
        showPassword.classList.add("fa-eye");
        showPassword.classList.remove("fa-eye-slash");
    } else {
        showPassword.classList.add("fa-eye-slash");
        showPassword.classList.remove("fa-eye");
    }
});