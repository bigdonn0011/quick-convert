const dropBox = document.getElementById("dropBox");
const fileInput = document.getElementById("fileInput");
const convBtn = document.getElementById("convBtn");
const chosenText = document.getElementById("chosenText");
let userChosenFormat = "webp";
let selectedFile = null;
const relative1 = document.getElementById("relative1");
const relative4 = document.getElementById("relative4");
const relative2 = document.getElementById("relative2");
const relative3 = document.getElementById("relative3");
const customName = document.getElementById("customName");
dropBox.addEventListener("click", () => {
    setTimeout(() => {
        dropBox.classList.add("ring-indigo-500", "bg-indigo-50");
    }, 100);
    setTimeout(() => {
        dropBox.classList.remove("ring-indigo-500", "bg-indigo-50");
    }, 300);

    fileInput.click();
});

fileInput.addEventListener("change", e => {
    if (e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        const parentDiv = chosenText.parentElement;

        parentDiv.classList.remove("hidden");
        parentDiv.classList.add(
            "flex",
            "justify-center",
            "items-center",
            "rounded-xl",
            "p-2",
            "shadow-md",
            "bg-indigo-50",
            "w-full",
            "font-medium"
        );
        chosenText.innerText = selectedFile.name;
        chosenText.classList.add("block", "px-2");
    }
});

// To activate Custom name
relative4.addEventListener("click", () => {
    document.getElementById("inputDiv").classList.remove("hidden");
});
relative3.addEventListener("click", () => {
    document.getElementById("inputDiv").classList.remove("hidden");
});
relative2.addEventListener("click", () => {
    document.getElementById("inputDiv").classList.remove("hidden");
});
relative1.addEventListener("click", () => {
    document.getElementById("inputDiv").classList.remove("hidden");
});
// console.log(selectedFile)
convBtn.addEventListener("click", () => {
    if (!selectedFile) return alert("Please select a file to proceed");
    const selectedRadio = document.querySelector(
        `input[name="format"]:checked`
    );
    const fileFormat = selectedRadio ? selectedRadio.value : "webp";
    if (!selectedRadio) return alert("Please select a File Format to proceed");

    // DELTE THI SHIT LATER
    userChosenFormat = selectedRadio.value;
    console.log(`File will be converted to ${userChosenFormat}`);
    // Basoc Setup
    const reader = new FileReader();
    reader.onload = e => {
        const img = new Image();
        img.onload = () => {
            let canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            console.log(
                "Basic Setup has been finished. Download will soon begin. "
            );
            // conversion logic.
            // This takes user input and convert
            if (userChosenFormat === "pdf") {
                const { jsPDF } = window.jspdf;
                const orientation = img.width > img.height ? "l" : "p";
                const pdf = new jsPDF(orientation, "px", [
                    img.width,
                    img.height
                ]);

                pdf.addImage(
                    canvas.toDataURL("image/jpeg", 1.0),
                    "JPEG",
                    0,
                    0,
                    img.width,
                    img.height
                );

                const userCustomName =
                    customName.value.trim() || `Quick-Convert-${Date.now()}`;
                pdf.save(`${userCustomName}.pdf`);
                console.log("PDF comverted");
            } else {
                const dataUrl = canvas.toDataURL(
                    `image/${userChosenFormat}`,
                    0.9
                );

                const link = document.createElement("a");
                console.log("Downloading process has begun");
                const userCustomName =
                    customName.value.trim() || `Quick-Convert-${Date.now()}`;
                link.download = `${userCustomName}.${userChosenFormat}`;
                link.href = dataUrl;
                link.click();
                canvas = null;
            }
        };

        img.src = e.target.result;
    }; 
    reader.readAsDataURL(selectedFile);
  console.log("Everything is Done")
}); // Ends convBtn
