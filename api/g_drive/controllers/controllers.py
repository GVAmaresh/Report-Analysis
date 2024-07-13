from googleapiclient.http import MediaFileUpload

Folder_Name = "Document_DB"
file_metadata = {
    "name": "Fake",
    "mimeType": "application/vnd.google-apps.folder",
}

def check_folder(service):
    try:
        resource = service.files()
        result = resource.list(
            q=f"mimeType = 'application/vnd.google-apps.folder' and 'root' in parents",
            fields="nextPageToken, files(id, name)",
        ).execute()
        list_folders = result.get("files")
        
        folder_id = None
        
        for folder in list_folders:
            if folder["name"] == Folder_Name:
                folder_id = folder["id"]
                break
            
        if not folder_id:
            folder = service.files().create(body=file_metadata, fields="id").execute()
            folder_id = folder["id"]
        
        return folder_id, "success"
    except Exception as e:
        print(f"Error occurred while pushing file to DB: {e}")
        return None, str(e)
            
    
def push_file_db(service, file):
    try: 
        folder_id, status = check_folder(service)
        
        if not folder_id:
            return [None, status]
        
        file_metadata = {"name": file.filename, "parents": [folder_id]}
        media = MediaFileUpload(file, mimetype="application/pdf")
        
        new_file = (
            service.files()
            .create(body=file_metadata, media_body=media, fields="id")
            .execute()
        )
        service.permissions().create(
            fileId=new_file["id"],
            body={"role": "reader", "type": "anyone"},
            fields="id",
        ).execute()
        
        return new_file.get("id"), "success"
    
    except Exception as e:
        print(f"Error occurred while pushing file to DB: {e}")
        return None, str(e)