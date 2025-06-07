window.onload = () => {
  loadNotes();
  loadTheme();
  document.getElementById("themeToggle").addEventListener("change", toggleTheme);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
  }
};

function addNote(text = "") {
  const notesContainer = document.getElementById("notes");

  const noteDiv = document.createElement("div");
  noteDiv.className = "note";

  const textarea = document.createElement("textarea");
  textarea.value = text;

  const saveBtn = document.createElement("button");
  saveBtn.innerText = "Save";
  saveBtn.className = "save-btn";
  saveBtn.onclick = () => saveNotes();

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => {
    noteDiv.remove();
    saveNotes();
  };

  noteDiv.appendChild(textarea);
  noteDiv.appendChild(saveBtn);
  noteDiv.appendChild(deleteBtn);
  notesContainer.appendChild(noteDiv);
}

function saveNotes() {
  const textareas = document.querySelectorAll("textarea");
  const notes = Array.from(textareas).map(note => note.value);
  localStorage.setItem("notes", JSON.stringify(notes));
  showToast();
}

function loadNotes() {
  const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  savedNotes.forEach(note => addNote(note));
}

function toggleTheme() {
  const darkMode = document.getElementById("themeToggle").checked;
  document.body.classList.toggle("dark", darkMode);
  localStorage.setItem("darkMode", darkMode ? "true" : "false");
}

function loadTheme() {
  const darkMode = localStorage.getItem("darkMode") === "true";
  document.body.classList.toggle("dark", darkMode);
  document.getElementById("themeToggle").checked = darkMode;
}

function showToast() {
  const toast = document.getElementById("toast");
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2000);
}

const firebaseConfig = {
 apiKey: "AIzaSyDsUJo3mK88bqevQplC3ghiYnR-VN-kuZU",
  authDomain: "note-app-46.firebaseapp.com",
  projectId: "note-app-46",
  storageBucket: "note-app-46.firebasestorage.app",
  messagingSenderId: "97066422600",
  appId: "1:97066422600:web:546d171957a06fd2bf237d",
  measurementId: "G-82YVRMDJHM"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
auth.signInWithEmailAndPassword("user@example.com", "password123")
  .then(() => console.log("Logged In"))
  .catch((err) => console.log(err.message));