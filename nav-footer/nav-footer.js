// language dropdown


let btnLang = document.querySelector(".btn-lang");
let dropLangContent = document.querySelector(".drop-lang-content");
let dropdown1 = document.querySelectorAll(".dropdown1");


btnLang.addEventListener("click", () => {
    dropLangContent.classList.toggle("d-none");
})

dropdown1.forEach(item => {
    item.addEventListener("click", () => {
        dropdown1.forEach(el => {
            el.classList.remove("active-dropdown1")
        });

        item.classList.add("active-dropdown1");

        dropLangContent.classList.add("d-none");

        btnLang.textContent = item.textContent + '⌵';
    })
})

window.addEventListener("click", (e) => {
    if (!btnLang.contains(e.target) && !dropLangContent.contains(e.target)) {
        dropLangContent.classList.add("d-none");
    }
})





// money dropdown


let btnMoney = document.querySelector(".btn-money");
let dropMoneyContent = document.querySelector(".drop-money-content");
let dropdown2 = document.querySelectorAll(".dropdown2");


btnMoney.addEventListener("click", () => {
    dropMoneyContent.classList.toggle("d-none");
})


dropdown2.forEach(item => {
    item.addEventListener("click", () => {
        dropdown2.forEach(el => {
            el.classList.remove("active-dropdown2")
        });

        item.classList.add("active-dropdown2");

        dropMoneyContent.classList.add("d-none");

        btnMoney.textContent = item.textContent + '⌵';
    })
})


window.addEventListener("click", (e) => {
    if (!btnMoney.contains(e.target) && !dropMoneyContent.contains(e.target)) {
        dropMoneyContent.classList.add("d-none");
    }
})




// show password


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



// sign in and cart drop down



let signInBottom = document.querySelector(".signInBottom");
let signInContent = document.querySelector(".signInContent");

let cartBottom = document.querySelector(".cartBottom");
let cartContent = document.querySelector(".cartContent");


signInBottom.addEventListener("click", (e) => {
    e.stopPropagation();

    cartContent.classList.add("d-none");
    cartBottom.classList.remove("active-cart");

    signInContent.classList.toggle("d-none");
    signInBottom.classList.toggle("active-aignIn");

    list_dropdown_category.classList.add("d-none");
    btn_categoy_nav.classList.remove("active_category");
});


cartBottom.addEventListener("click", (e) => {
    e.stopPropagation();

    signInContent.classList.add("d-none");
    signInBottom.classList.remove("active-aignIn");

    cartContent.classList.toggle("d-none");
    cartBottom.classList.toggle("active-cart");

    list_dropdown_category.classList.add("d-none");
    btn_categoy_nav.classList.remove("active_category");
});


signInContent.addEventListener("click", (e) => e.stopPropagation());
cartContent.addEventListener("click", (e) => e.stopPropagation());


window.addEventListener("click", () => {
    signInContent.classList.add("d-none");
    signInBottom.classList.remove("active-aignIn");

    cartContent.classList.add("d-none");
    cartBottom.classList.remove("active-cart");

    btn_categoy_nav.classList.remove("active_category");
});



let btn_categoy_nav = document.querySelector(".btn_categoy_nav");

btn_categoy_nav.addEventListener("click", (e) => {
    e.stopPropagation();
    cartContent.classList.add("d-none");
    signInContent.classList.add("d-none");

    btn_categoy_nav.classList.toggle("active_category");
});