class GitHub {

    constructor(){
        this.url = "https://api.github.com/users/"; // özellik olarak ekledik
    }

    async getGitHubData(username){
        const responseUser = await fetch(this.url + username); // url in sonuna gerekli username bilgisini alıp ekliyoruz
        const responseRepo = await fetch(this.url + username + "/repos"); // repolar için bir istek atacağız
        

        // dönen json verileri, promise olarak alma
        // userDara ve repoData değişkenlerine json objelerini atıyoruz
        const userData = await responseUser.json();
        const repoData = await responseRepo.json();
        

        // verilerimizi app js de kullanabilmek için return dönüyoruz
        // obje şeklinde dönüyoruz

        return {
            user:userData,
            repo:repoData
        }
    }
}