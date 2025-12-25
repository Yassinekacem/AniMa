"use client";

export default function UploadPage() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fileInput = form.file as HTMLInputElement;

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("Veuillez choisir un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Uploader un fichier de logs</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <br /><br />
        <button type="submit">Uploader</button>
      </form>
    </div>
  );
}
