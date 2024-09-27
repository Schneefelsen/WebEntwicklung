# Konzept und Entwicklungsprozess einer Wetter-Webanwendung - von Tim Schacht

## Einleitung

Die Idee hinter der Wetter-Webanwendung **Gewitter?!** entstand auf Basis des Youtube Videos *Gewitter Oma*, in dem eine ältere Dame verzweifelt versucht herauszufinden, ob es bei ihrem Enkel daheim gewittert. Angesichts der zunehmenden Bedeutung von Wettervorhersagen im Alltag wurde daher das Ziel definiert, eine benutzerfreundliche Plattform zu schaffen, die es den Nutzern ermöglicht, schnell und einfach aktuelle Wetterdaten und Vorhersagen für verschiedenste Städte abzurufen. Diese Anwendung sollte nicht nur funktional sein, sondern auch ästhetisch ansprechend und leicht verständlich, um eine breite Benutzerbasis anzusprechen.

## Schaffensprozess und Herausforderungen

### 1. Ideenfindung und Konzeptualisierung

Der erste Schritt in der Entwicklung der Anwendung war die Ideenfindung. Hierbei wurden verschiedene Funktionen diskutiert, die die Benutzererfahrung verbessern könnten. Die wichtigsten Funktionen, die implementiert werden sollten, waren:

- **Aktuelle Wetterdaten:** Die Möglichkeit, aktuelle Wetterinformationen für eine beliebige Stadt abzurufen.
- **Fünf-Tage-Vorhersage:** Eine detaillierte Prognose für die kommenden Tage.
- **Wetter-Karte:** Eine interaktive Karte der ausgewählten Umgebung mit Informationen zu Niederschlag und Wolkenwanderung
- **Mehrsprachigkeit:** Unterstützung mehrerer Sprachen, um eine internationale Benutzerbasis anzusprechen.
- **Interaktive Benutzeroberfläche:** Eine ansprechende UI, die sowohl auf Desktop- als auch auf Mobilgeräten gut aussieht und dabei so übersichtlich wie nur möglich ist.

### 2. Auswahl der Technologien

Nach der Festlegung der grundlegenden Funktionen musste ein technisches Framework ausgewählt werden. Die Entscheidung fiel auf die Verwendung von HTML, CSS und JavaScript, um eine responsive Webanwendung zu erstellen. Die OpenWeatherMap API wurde als Datenquelle für die Wetterinformationen ausgewählt. Diese API bot eine breite Palette an Wetterdaten und war einfach zu verwenden, was die Implementierung erleichterte.

### 3. Design der Benutzeroberfläche

Das Design der Benutzeroberfläche stellte eine der größten Herausforderungen dar. Es galt, eine Balance zwischen Ästhetik und Benutzerfreundlichkeit zu finden. Hierbei wurden mehrere Prototypen erstellt, die die Navigation, das Layout und die Farbgestaltung umreißen sollten. 

Ein entscheidender Aspekt war die Gestaltung für verschiedene Bildschirmgrößen. Die Anwendung sollte auf mobilen Geräten genauso gut funktionieren wie auf Desktops. Um dies zu erreichen, wurde ein flexibles Layout mit Flexbox erstellt, das es ermöglichte, Inhalte dynamisch an verschiedene Bildschirmgrößen anzupassen.

### 4. Implementierung und Testing

Die Implementierung der Anwendung begann mit der Strukturierung des HTML-Dokuments und der Entwicklung von CSS-Stilen. Anschließend wurde die JavaScript-Logik zur Interaktion mit der OpenWeatherMap API entwickelt. 

Ein wichtiger Punkt war die Fehlerbehandlung. Oft gab es Probleme mit API-Anfragen, wie Netzwerkfehler oder fehlerhafte requests. Um den Benutzern eine nahtlose Erfahrung zu bieten, wurden klare Fehlermeldungen implementiert, die in der jeweiligen Sprache des Benutzers angezeigt werden.

### 5. Schwierigkeiten während der Entwicklung

Trotz sorgfältiger Planung und Tests traten während der Entwicklung mehrere Schwierigkeiten auf. Eine der größten Herausforderungen war die korrekte Handhabung der API-Daten. Es war oft schwierig, die richtigen Informationen zu extrahieren und im gewünschten Format darzustellen. 

Ursprünglich geplant war die Implementierung einer interaktiven Wetterkarte, doch da sich dabei vermehrt Komplikationen mit der OpenWeather API sowie der geschickten Platzierung der Karte selbst ergaben, wurde diese Idee letztendlich wieder verworfen.

## Architektur der Anwendung

Die Architektur der Wetter-Webanwendung ist in mehrere Schlüsselkomponenten unterteilt:

### 1. Frontend

Das Frontend besteht aus drei Hauptteilen:

- **HTML:** Die Struktur der Anwendung, die grundlegende Elemente wie Eingabefelder, Schaltflächen und Container für die Wetterdaten umfasst.
- **CSS:** Die Gestaltung und das Layout der Anwendung, um sicherzustellen, dass sie sowohl auf Desktop- als auch auf Mobilgeräten ansprechend aussieht.
- **JavaScript:** Die Logik, die die Benutzerinteraktionen verarbeitet, die API-Anfragen durchführt und die Daten dynamisch aktualisiert.

### 2. Backend

Das Backend der Anwendung wird durch die OpenWeatherMap API unterstützt. Diese API liefert alle notwendigen Wetterdaten, die über HTTP-Anfragen abgerufen werden. Es gibt keinen eigenen Server für diese Anwendung, da alle Daten direkt von der API abgerufen werden. 

### 3. Datenfluss

Der Datenfluss innerhalb der Wetter-Webanwendung erfolgt in einem strukturierten und logischen Ablauf, der es ermöglicht, Benutzeranfragen zu verarbeiten und die gewünschten Wetterdaten dynamisch anzuzeigen. Im Folgenden wird der gesamte Prozess detaillierter beschrieben, einschließlich der im Script verwendeten Funktionen.

#### 3.1. Benutzereingabe

1. **Benutzereingabe:** Der Benutzer gibt eine Stadt in das Eingabefeld ein. Diese Eingabe wird über ein HTML-Element (`<input>`-Tag) verarbeitet. Um die Eingabe zu validieren und zu verarbeiten, kommen folgende Event-Listener zum Einsatz:

    - **`keydown`-Event-Listener:** Dieser Listener wird an das Eingabefeld gebunden. Wenn der Benutzer die Enter-Taste drückt, wird die Funktion `getWeather()` aufgerufen, um die Wetterdaten abzurufen.

    ```javascript
    document.getElementById('cityInput').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            getWeather();
        }
    });
    ```

#### 3.2. API-Anfrage für geografische Daten

2. **API-Anfrage:** Die `getWeather()`-Funktion wird aufgerufen, um die Wetterdaten abzurufen. Der erste Schritt innerhalb dieser Funktion besteht darin, die Eingabe des Benutzers zu validieren. Ist die Eingabe leer, wird eine Warnung angezeigt. Ansonsten wird die Funktion fortgesetzt:

    ```javascript
    async function getWeather() {
        const city = document.getElementById('cityInput').value;
        if (!city) {
            alert(translations[selectedLanguage].inputPlaceholder);
            return;
        }
    ```

3. **Geodatenabruf:** Um die geografischen Koordinaten (Breiten- und Längengrad) der angegebenen Stadt zu erhalten, wird eine Anfrage an die Geocoding-API von OpenWeatherMap gesendet. Die Anfrage erfolgt über die URL `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`.

    ```javascript
    const geo_response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`);
    const geo_data = await geo_response.json();
    ```

4. **Fehlerbehandlung:** Wenn die API keine Ergebnisse zurückgibt (d.h., die Stadt wurde nicht gefunden), wird eine entsprechende Warnung angezeigt:

    ```javascript
    if (geo_data.length === 0) {
        alert(translations[selectedLanguage].cityNotFound);
        return;
    }
    ```

5. **Extrahieren der Koordinaten:** Die Breiten- und Längengradwerte werden aus dem Geodatenobjekt extrahiert:

    ```javascript
    const lat = geo_data[0].lat;
    const lon = geo_data[0].lon;
    ```

#### 3.3. API-Anfrage für aktuelle Wetterdaten

6. **Abrufen der aktuellen Wetterdaten:** Mit den erhaltenen Koordinaten wird eine weitere API-Anfrage an die OpenWeatherMap-Weather-API gesendet, um die aktuellen Wetterdaten abzurufen. Die Anfrage wird unter Verwendung der URL `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${selectedLanguage}` durchgeführt:

    ```javascript
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${selectedLanguage}`);
    const data = await response.json();
    ```

7. **Verarbeitung der Wetterdaten:** Die zurückgegebenen Wetterdaten werden verarbeitet, um die relevanten Informationen wie den Namen der Stadt, das Land, die Temperatur und die Wetterbeschreibung zu extrahieren:

    ```javascript
    document.getElementById('station').innerText = translations[selectedLanguage].stationInfo + `: ${data.name}, ${data.sys.country}`;
    document.getElementById('weatherData').innerText = translations[selectedLanguage].tempInfo + `: ${data.main.temp}°C, `+ translations[selectedLanguage].weatherInfo + `: ${data.weather[0].description}`;
    ```

#### 3.4. Benutzeroberfläche aktualisieren

8. **Hintergrundbild ändern:** Abhängig von den aktuellen Wetterbedingungen wird das Hintergrundbild der Anwendung entsprechend aktualisiert:

    ```javascript
    const mainWeather = data.weather[0].main;
    document.body.style.backgroundImage = weatherBackgrounds[mainWeather] || randomBackground;
    ```

9. **Wetterwarnung:** Es wird überprüft, ob das Wetter 'Thunderstorm' ist, und die Benutzeroberfläche wird entsprechend aktualisiert:

    ```javascript
    if (mainWeather === 'Thunderstorm') {
        document.getElementById('mainName').innerText = translations[selectedLanguage].storm;
        document.getElementById('weatherButton').innerText = translations[selectedLanguage].storm;
    } else {
        document.getElementById('mainName').innerText = translations[selectedLanguage].noStorm;
        document.getElementById('weatherButton').innerText = translations[selectedLanguage].buttonLabel;
    }
    ```

#### 3.5. Abrufen der fünf Tage Vorhersage

10. **Vorhersage abrufen:** Nachdem die aktuellen Wetterdaten abgerufen und angezeigt wurden, wird die Funktion `getForecast(lat, lon)` aufgerufen, um die fünf Tage Wettervorhersage zu erhalten:

    ```javascript
    getForecast(lat, lon);
    ```

11. **API-Anfrage für die Vorhersage:** In der Funktion `getForecast(lat, lon)` wird eine weitere Anfrage an die OpenWeatherMap-Forecast-API gesendet, um die Vorhersagedaten abzurufen. Diese Anfrage nutzt die URL `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${selectedLanguage}`:

    ```javascript
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=${selectedLanguage}`);
    const forecastData = await forecastResponse.json();
    ```

12. **Vorhersage anzeigen:** Der vorherige Inhalt des Vorhersagecontainers wird gelöscht, um Platz für die neuen Daten zu schaffen. Anschließend wird die Vorhersage für jeden achten Datensatz (was den 24-Stunden-Intervallen entspricht) erstellt und angezeigt:

    ```javascript
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';  // Clear previous forecast

    for (let i = 0; i < forecastData.list.length; i += 8) {
        const dayData = forecastData.list[i];

        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');

        const date = new Date(dayData.dt * 1000).toLocaleDateString(selectedLanguage, { weekday: 'long', day: 'numeric', month: 'numeric' });
        const temp = `${dayData.main.temp}°C`;
        const description = dayData.weather[0].description;

        forecastDay.innerHTML = `
            <h3>${date}</h3>
            <p>${temp}</p>
            <p>${description}</p>
        `;
        forecastContainer.appendChild(forecastDay);
    }
    ```

#### 3.6. Abschluss des Datenflusses

Der gesamte Datenfluss innerhalb der Anwendung ermöglicht eine nahtlose Benutzererfahrung, in der die Benutzer sowohl aktuelle Wetterdaten als auch eine detaillierte Vorhersage erhalten. Durch die Verwendung klarer Funktionen und logischer Abläufe wird die Interaktivität der Anwendung maximiert, sodass die Benutzer schnell und einfach die benötigten Informationen abrufen können.

### 4. Benutzeroberfläche

Die Benutzeroberfläche wurde so gestaltet, dass sie eine einfache Navigation ermöglicht. Sie enthält folgende Elemente:

- **Titel:** Zeigt den Haupttitel der Anwendung an.
- **Stadteingabefeld:** Ermöglicht es den Benutzern, eine Stadt einzugeben.
- **Spracheinstellungen:** Benutzer können zwischen verschiedenen Sprachen wechseln, um die Anwendung in ihrer bevorzugten Sprache zu nutzen.
- **Wetterdaten:** Zeigt die aktuellen Wetterbedingungen und Vorhersagen an.
- **Hintergrundbild:** Das Hintergrundbild der Anwendung ändert sich je nach Wetterbedingungen, um die Benutzererfahrung zu verbessern.

## Deployment

Um die Anwendung für ein breiteres Publikum zugänglich zu machen, wurde sie auf GitHub Pages ([github.io](https://schneefelsen.github.io/WebEntwicklung/index.html)) bereitgestellt. Dies ermöglicht es Nutzern, die Anwendung online zu besuchen, ohne sie lokal installieren zu müssen. 

Die Bereitstellung auf GitHub Pages war relativ einfach, da sie direkt aus einem GitHub-Repository heraus durchgeführt werden kann. Nach dem Hochladen des Codes in das Repository und dem Aktivieren von GitHub Pages konnte die Anwendung über eine benutzerfreundliche URL aufgerufen werden.

## Fazit

Insgesamt war die Entwicklung dieser Wetter-Webanwendung eine spannende Herausforderung, die sowohl technisches Wissen als auch kreative Problemlösungsfähigkeiten erforderte. Die Anwendung bietet nicht nur wertvolle Wetterinformationen, sondern auch eine ansprechende Benutzeroberfläche, die auf verschiedenen Geräten gut aussieht. Durch die Veröffentlichung auf GitHub Pages können Benutzer weltweit von dieser Anwendung profitieren.
