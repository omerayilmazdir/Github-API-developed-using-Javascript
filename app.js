// Elementleri seçelim

const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");

// github sınıfımızdan objemizi oluşturuyoruz

const github = new GitHub();
const ui = new UI();

addEventListeners();

function addEventListeners() {
    // form submit olduğunda verileri al fonksiyonunu çalıştır
    githubForm.addEventListener('submit',getData);

    clearLastUsers.addEventListener('click',clearAllSearched);

    // sayfamız yenilendiğinde localstorage de ki verileri al
    document.addEventListener("DOMContentLoaded",getAllSearched); 

}
// verileri getirecek olan fonksiyon
function getData(e) {
    // nameInput taki verileri sağdaki ve soldaki boşluklarını silerek alıyoruz
    
    let username = nameInput.value.trim();

    if(username === ""){
        // hata
        alert("Lütfen geçerli bir kullanıcı adı giriniz.")
    }
    else{
         // username değerimizi, oluşturduğumuz github objesindeki
        // getGitHubData ya gönderiyoruz

        github.getGitHubData(username) // promise yapısıyla response umuzu yakalayacağız
        .then(response => {
            // eğer gönderilen kullanıcı adı hatalı ise
            // yani karmakarışık değerlere sahip ve notfound ise
            if(response.user.message === "Not Found"){
                // Hata mesajı
                ui.showError("Lütfen geçerli bir kullanıcı adı girin!")
            }
            else{
                // ilk önce ara yüze ekleme yapılacak
                ui.addSearchedUserToUI(username);
                // aranan usersları storage a ekleme
                // içerisine yukarıda tanımladığımı username i veriyoruz
                // yani inputtan gelen verinin değerini
                Storage.addSearchedUsersFromStorage(username);
                // github.js katmanında oluşturduğumuz sınıfın içerisindeki return değerlerini döndürüyoruz
                ui.showUserInfo(response.user);
                ui.showRepoInfo(response.repo)
            }
        }) // olumlu ise cevap then ile 
        .catch(err => ui.showError(err)); // olumsuz cevap ise catch ile yakalıyoruz
        
    }

   // bu fonksiyon ile input u temizledik
    ui.clearInput();

    // sayfa yenilenmesini önleme
    e.preventDefault();
}

// tüm aramaları silme fonksiyonu
function clearAllSearched() {
    if(confirm('Emin misiniz?')){
        // silme işlemleri
        // storage taki static silme fonksiyonunu alıyoruz
        Storage.clearAllSearchedUsersFromStorage();
        ui.clearAllSearchedFromUI();
    }
}

// aramaları storage den alıp ui a ekleme işlemi
function getAllSearched() {
    let users = Storage.getSearchedUsersFromStorage();

    let result = "";

    users.forEach(user => {
        result += `
        <li class="list-group-item">${user}</li>
        `
    });

    lastUsers.innerHTML = result;
}