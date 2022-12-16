class UI {
    constructor(){
        // sabit tanımlamalarımızı yapıyoruz
        // arayüz için gerekli olan div ve input elemenlerini seçiyoruz
        this.profileDiv = document.getElementById("profile");
        this.repoDiv = document.getElementById("repos");
        this.lastUsers = document.getElementById("last-users");
        this.inputField = document.getElementById("githubname");
        this.cardBody = document.querySelector(".card-body");
    }
    // her arama sonunda input un içerisini temizleyeceğiz

    clearInput(){
        this.inputField.value = "";
    }

    showUserInfo(user){
        this.profileDiv.innerHTML = `
        
        <div class="card card-body mb-3">
                    <div class="row">
                      <div class="col-md-4">
                        <a href="${user.html_url}" target = "_blank">
                         <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
                         <hr>
                         <div id="fullName"><strong>${user.name}</strong></div>
                         <hr>
                         <div id="bio">${user.bio}</div>
                        </div>
                      <div class="col-md-8">
                            <button class="btn btn-secondary">
                                  Takipçi  <span class="badge badge-light">${user.followers}</span>
                            </button>
                            <button class="btn btn-info">
                                 Takip Edilen  <span class="badge badge-light">${user.following}</span>
                              </button>
                            <button class="btn btn-danger">
                                Repolar  <span class="badge badge-light">${user.public_repos}</span>
                            </button>
                            <hr>
                            <li class="list-group">
                                <li class="list-group-item borderzero">
                                    <img src="images/company.png" width="30px"> <span id="company">${user.company}</span>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/location.png" width="30px"> <span id = "location">${user.location}</a>
                                    
                                </li>
                                <li class="list-group-item borderzero">
                                    <img src="images/mail.png" width="30px"> <span id="mail">${user.email}</span>
                                    
                                </li>
                                
                            </div>
                               
                            
                      </div>
                </div>
        
        `;
    }

    showRepoInfo(repos){

        // eski repo bilgilerini siliyoruz ilk başta

        this.repoDiv.innerHTML = "";
        
        // daha sonra repos array ini foreach ile dönüyoruz

        repos.forEach(repo => {
            this.repoDiv.innerHTML += `
                <div class="mb-2 card-body">
                    <div class="row">
                        <div class="col-md-2">
                        <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-secondary">
                                Starlar  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                            </button>

                            <button class="btn btn-info">
                                Forklar  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                            </button>
                    
                        </div>
                </div>

                </div>
        
        `;
        })
    }

    addSearchedUserToUI(username){

        // Storage deki veriyi alıyoruz
        let users = Storage.getSearchedUsersFromStorage();

        // eğer bu isimde bir kullanıcı ismi yok ise ara yüze ekleme işlemini yapabiliriz
        if(users.indexOf(username) === -1){
            // <li class="list-group-item">asdaskdjkasjkşdjşasjd</li>
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;

            // bu li mizi ul mize child olarak ekliyoruz

            this.lastUsers.appendChild(li);
            
        }


    }

    // UI Temizleme işlemi
    clearAllSearchedFromUI(){
        // ul nin tüm çocuklarını sileceğiz
        while(this.lastUsers.firstElementChild !== null){
            // lastUsers ın yani ul class ımızın ilk elementi boş olmadığı sürece
            // dönen döngüde
            // ul class ının ilk elementini sil
            this.lastUsers.removeChild(this.lastUsers.firstElementChild);
        }
    }


    // alert mesajı için element oluşturuyoruz
    showError(message) {
        const div = document.createElement('div');

        div.className = "alert alert-danger";
        div.textContent = message;

        // card-body nin sonuna ekliyoruz
        this.cardBody.appendChild(div);

        // uyarı mesajını ekrandan 2sn sonra siliyoruz
        setTimeout(() => {
            div.remove();
        },2000)
    }

}