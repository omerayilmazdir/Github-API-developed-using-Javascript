class Storage {

    static getSearchedUsersFromStorage(){
        // Tüm kullanıcıları al

        let users;

        // localStorage da böyle bir verimiz yok ise
        // searched key i ile sorguluyoruz
        if(localStorage.getItem("searched") === null){
            // users ı boş bir array şeklinde oluşturuyoruz
            users = [];
        }
        else {
            // eğer böyle bir değerimiz var ise 
            // bunu array a çeviriyoruz
            users = JSON.parse(localStorage.getItem("searched"));
        }
        return users;

    }
    // static metodlara obje üzerinden ulaşılmaz
    // direkt class olarak çağırılır
    static addSearchedUsersFromStorage(username){
        // Kullanıcı ekle
        // ilk önce kullanıcımızı elde edelim

        let users = this.getSearchedUsersFromStorage(); // bu fonksiyonumuzun içerisindeki metodu kullanacağız

        // IndexOf
        // -1 sonucu gelirse o username, users array inde yoktur
        // eğer yok ise böyle bir kullanıcı, push ile array imize ekliyoruz.
        if(users.indexOf(username) === -1){
            users.push(username);
        }

        // localStorage ı güncelliyoruz
        // verilerimiz localStorage a string şeklinde kayıt edildiği için
        // verimizi string halinde kaydediyoruz
        localStorage.setItem("searched",JSON.stringify(users));

    }
    static clearAllSearchedUsersFromStorage(){
        // Tüm kullanıcıları sil
        localStorage.removeItem("searched");
    }
}