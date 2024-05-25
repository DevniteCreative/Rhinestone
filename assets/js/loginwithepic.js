<script>
        function loginWithEpic() {
            // Redirect the user to the Epic Games login page
            window.location.href = `https://www.epicgames.com/id/authorize?client_id=xyza7891D9UWmFmhLv4Qyprz2w9AQiof&redirect_uri=${window.location.href}&response_type=code&scope=basic_profile`;
        }

        // Function to decode the JWT token and display the displayname
        function decodeToken(token) {
            // Decode the payload of the token
            const payload = JSON.parse(atob(token.split('.')[1]));

            // Extract the displayname from the payload
            const displayName = payload.dn;

            // Update the button text to display the displayname
            document.getElementById("loggedInMessage").innerText = "Logged in as " + displayName;
        }

        // Check if there's an authorization code in the URL (returned from Epic Games after login)
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
            // Make a request to the token endpoint to exchange the code for an access token 'https://corsproxy.io/?' + encodeURIComponent('https://dev.epicgames.com/portal/api/v1/services/tickets/submit/');
            fetch('https://corsproxy.io/?' + encodeURIComponent('https://api.epicgames.dev/epic/oauth/v2/token'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic eHl6YTc4OTFEOVVXbUZtaEx2NFF5cHJ6Mnc5QVFpb2Y6RUNSSzhFTS9vbWRoUnlmK1dhNklqTGVOZHZVSE5rYTY3RHNuM1FuMEw0QQ==' // Replace with your client credentials
                },
                body: 'deployment_id=864f12bc0bdf472ea2a8c7c4b1485c25&grant_type=authorization_code&code=' + code
            })
            .then(response => response.json())
            .then(data => {
                // Extract the access token from the response
                const accessToken = data.access_token;
                // Decode the access token and display the displayname
                decodeToken(accessToken);
            })
            .catch(error => console.error('Error:', error));
        }

  // Funktion zum Speichern des Zugriffstokens im lokalen Speicher
function saveAccessToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
}

// Funktion zum Überprüfen des Login-Status anhand des Zugriffstokens im lokalen Speicher
function checkLoginStatus() {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        // Der Benutzer ist angemeldet
        return true;
    } else {
        // Der Benutzer ist nicht angemeldet
        return false;
    }
}

// Funktion zum Abmelden und Löschen des Zugriffstokens aus dem lokalen Speicher
function logout() {
    localStorage.removeItem('accessToken');
    // Weitere Aktionen zum Abmelden, z.B. Weiterleitung auf eine Abmelde-Seite
}

// Beispiel für die Verwendung
if (checkLoginStatus()) {
    // Benutzer ist angemeldet
    // Zeige angemeldeten Inhalt an
} else {
    // Benutzer ist nicht angemeldet
    // Zeige Anmeldeformular oder Anmeldeoptionen an
}

    </script>
