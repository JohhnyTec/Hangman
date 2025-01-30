const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

let gameinfo = {
  "0": ["Hangman", "Server", "Computer", "Webseite", "Hardware", "Software", "Tastatur", "Google", "Dokument", "Sicherheit", "Internet", "Anwendung", "Funktion", "Code", "Programm", "Client", "Informatik", "Netzwerk", "Snack", "Monitor", "Maus", "Haus", "Laus", "Grafik", "Handy", "Speicher", "Papierkorb", "Arbeitsplatz", "Datei", "Api", "Array", "Binaer"],
  "1": ["Hypertext", "Javascript", "Grafikdesign", "Webbrowser", "Computermaus", "Stylesheet", "Framework", "Prozessor", "Komplexitaet", "Abstraktion", "Dekomposition", "Betriebssystem", "Firewall", "Malware", "Virtualisierung", "Darstellung", "Grafikkarte", "Smartphone", "Festplatte", "Bildschirm", "Programmierung", "Arbeitsspeicher", "Pseudocode", "Datenstruktur", "Backup", "Bandbreite", "Blockchain"],
  "2": ["Anglizismus", "Bundesausbildungsfoerderungsgesetz", "Arbeiterunfallversicherungsgesetz", "Netzwerktopologie", "Prozessorleistung", "Kryptographieverfahren", "Softwareentwicklung", "Datenschutzbestimmungen", "Dartellungsebene", "Arbeitsspeicherauslastung", "Konfigurationsdatei", "Grafikkartenauslastung", "Bildschirmfrequenz", "Festplattenspeicher", "Defragmentierung", "Problembehandlung", "Sytemkomponenten", "Backendentwicklung", "Frontendentwicklung", "Algorithmus", "Datenbankmanagementsystem", "Programmierschnittstelle", "Versionsverwaltungssystem", "Netzwerksicherheitsprotokoll", "Betriebssystemkompatibilitaet", "Speicherverwaltungseinheit", "Verschluesselungsalgorithmus", "Authentifizierungsmechanismus", "Fehlertoleranzmechanismus", "Benutzerfreundlichkeitstest", "Softwareentwicklungszyklus"]
};

app.get('/wort/:lvl', (req, res) => {
  const lv = req.params.lvl;
  const selectedArray = gameinfo[lv];

  if (selectedArray) {
    const randomIndex = Math.floor(Math.random() * selectedArray.length);
    const wort = selectedArray[randomIndex];
    res.json({ wort: wort });
  } else {
    res.status(404).json({ error: "Level nicht gefunden" });
  }
});

app.listen(5000, () => {
  console.log("Server läuft auf Port "+PORT);
});