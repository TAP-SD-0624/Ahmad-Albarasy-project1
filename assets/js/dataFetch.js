export async function loadData  (filePath){
    const response = await fetch(filePath);
    if (!response.ok){
        console.error("Data retrival failed :(");
        return null;
    }
    const data = await response.json();
    return data;
}