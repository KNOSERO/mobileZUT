class RestCalendarClient {

    uri = 'https://mobilezut.herokuapp.com';

    async addHour(token, item) {
        const response = await fetch(`${this.uri}/calendar/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                plan: item,
            }),
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }

    async getPlan(token) {
        const response = await fetch(`${this.uri}/calendar/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        if (response.status == 200)
            return response.json();
        else
            return [];
    }
}

class RestChatlient {

    uri = 'https://mobilezut.herokuapp.com';

    /** DODANIE GRUPY
     * 
     * @param {string} token 
     * @param {{idChat: string, idGroup: string, members: [string] }} item 
     */
    async addGroup(token, item) {
        const response = await fetch(`${this.uri}/chat/addGroup`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                idChat: item.idChat,
                idGroup: item.idGroup,
                members: item.members,
            }),
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }

    /** DODANIE CZŁONKA
     * 
     * @param {string} token 
     * @param {{context: string, memberID: string}} item 
     */
    async addMassagePrivate(token, item) {
        const response = await fetch(`${this.uri}/chat/private`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                context: item.context,
                memberID: item.memberID,
            }),
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }

    /** DODANIE WIADOMOSCI DO CZATU GRUPY
     * 
     * @param {string} token 
     * @param {{context: *, groupID: *}} item 
     */
    async addMassagePublic(token, item) {
        const response = await fetch(`${this.uri}/chat/public`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                context: item.context,
                groupID: item.groupID,
            }),
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }

    /** EDYCJA NAZWY
     * 
     * @param {string} token 
     * @param {{id: string, name: string}} item 
     */
    async editName(token, item) {
        const response = await fetch(`${this.uri}/chat/name`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                id: item.id,
                name: item.name
            }),
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }

    /** EDYCJA NAZWY
     * 
     * @param {string} token 
     * @param {{id: string, context: string}} item 
     */
    async editMessage(token, item) {
        const response = await fetch(`${this.uri}/chat/editMassage`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                id: item.id,
                context: item.context,
            }),
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }

    /** POBIERANIE CHATÓW
     * 
     * @param {string} token 
     */
    async getChat(token) {
        const response = await fetch(`${this.uri}/chat/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        if (response.status == 200)
            return response.json();
        else
            return [];
    }

    /** DODANIE WIADOMOŚCI
     * 
     * @param {string} token 
     * @param {{context: string, idChat: string, id: string}} item 
     */
    async newMessage(token, item) {
        const response = await fetch(`${this.uri}/chat/addMassage`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                context: item.context,
                idChat: item.idChat,
                id: item.id,
            }),
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }
    
    /** PRZECZYTNIE CZATU
     * 
     * @param {*} token 
     * @param {*} item 
     */
    async readChat(token, item) {
        const response = await fetch(`${this.uri}/chat/read`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                id: item.id,
            }),
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }
}

class RestUserClient {

    uri = 'https://mobilezut.herokuapp.com';

    async login(item) {
        const response = await fetch(`${this.uri}/account/login/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: item.email,
                password: item.password,
            }),
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }

    async register(item) {
        const response = await fetch(`${this.uri}/account/register/`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                email: item.email,
                password: item.password,
                name: item.name,
                surname: item.surname
            }),
        });

        return response.json();
    }

    async getMembers(token, item) {
        const response = await fetch(`${this.uri}/users/` + item.groupId, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        if (response.status == 200)
            return response.json();
        else
            return [];
    }

    async getGroup(token) {
        const response = await fetch(`${this.uri}/groups/`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        });

        if (response.status == 200)
            return response.json();
        else
            return [];
    }

}

class RestLocationClient {
    
    uri = 'https://mobilezut.herokuapp.com';

    async findLocation(name) {
        const response = await fetch(`${this.uri}/location/${name}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }
    
}

class RestTransportClient {

    //uri = 'http://192.168.0.14:3000'
    uri = 'https://transport-mobilezut.herokuapp.com';

    async getTransport(name, item) {
        const response = await fetch(`${this.uri}/${name}?` + new URLSearchParams({
            lat: item.lat,
            lng: item.lng,
            date: item.date,
        }), {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }

    async getPicture(item) {
        const response = await fetch(`${this.uri}/location/details?` + new URLSearchParams({
            locName: item.locName,
            roomName: item.roomName,
        }), {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.status == 200)
            return response.json();
        else
            return null;
    }
}

class RestZutClient {

    async token(item) {
        const makeToken = () => {
            let temp = '18';
            for (let i = 0; i < 30; i++)
                temp = temp + Math.floor(Math.random() * 10).toString();
            return temp;
        }

        return new Promise(function (res) {
            const data = "login=" + item.login + "&password=" + item.password + "&token=" + makeToken();

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    res(xhr.response);
                }
            };

            xhr.open("POST", "https://www.zut.edu.pl/app-json-proxy/index.php?f=getAuthorization");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.send(data);
        });
    }

    async day(item) {
        const makeDay = (day) => {
            const date = new Date();
            date.setDate(date.getDate() + day);
            let d = "";
            let m = "";
            if (date.getDate() < 10)
                d = "0" + date.getDate();
            else
                d = "" + date.getDate()
            if (date.getMonth() < 10)
                m = "0" + (date.getMonth() + 1);
            else
                m = "" + (date.getMonth() + 1);
            let r = 1900 + date.getYear();
            return "" + d + m + r;
        }

        return new Promise(function (res) {
            const data = "login=" + item.login + "&token=" + item.token + "&day=" + makeDay(item.day);

            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    res(xhr.response);
                }
            };

            xhr.open("POST", "https://www.zut.edu.pl/app-json-proxy/index.php?f=getPlan");
            xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

            xhr.send(data);
        });
    }
}


export default {
    RestCalendarClient,
    RestChatlient,
    RestUserClient,
    RestLocationClient,
    RestTransportClient,
    RestZutClient,
};