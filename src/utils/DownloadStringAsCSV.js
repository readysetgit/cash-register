export const downloadStringAsCSV = (content) => {
    const blob = new Blob([content], { type: "text/csv" });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
}