const STORAGE_DOC_NAME = "documents"

export const localSaveContent = (content, docName) => {
    if (typeof(Storage) === "undefined") {
        console.error("localSaveLayout: browser does not supoort Local Storage");
        return [];
    }

    let savedDocuments = [];
    let savedLayoutsStr = localStorage.getItem(STORAGE_DOC_NAME);
    if (savedLayoutsStr !== null) {
        savedDocuments = JSON.parse(savedLayoutsStr)
    }

    // Find any existing layout with same name. Remove it and replace with our new one.
    createOrReplaceDocument(savedDocuments, docName, content);

    localStorage.setItem(STORAGE_DOC_NAME, JSON.stringify(savedDocuments));
    console.log("localSaveLayout");

    return savedDocuments;
}

const createOrReplaceDocument = (savedDocs, name, docContent) => {
    let newObj = {
        name,
        docContent
    }

    let existingLayoutIdx = savedDocs.findIndex(x => x!== null && x.name === name);
    if (existingLayoutIdx !== -1) {
        savedDocs[existingLayoutIdx] = newObj;
    }
    else {
        savedDocs.push(newObj);
    }
}

const locaLoadContent = (docName) => {

}

export const localListDocs = () => {
    let savedLayoutsStr = localStorage.getItem(STORAGE_DOC_NAME);
    if (savedLayoutsStr === null) {
        return [];
    }

    return JSON.parse(savedLayoutsStr)
}