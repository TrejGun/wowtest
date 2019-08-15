export declare interface File {
  /** Field name specified in the form */
  fieldname: string;
  /** Name of the file on the user's computer */
  originalname: string;
  /** Encoding type of the file */
  encoding: string;
  /** Mime type of the file */
  mimetype: string;
  /** Size of the file in bytes */
  size: number;
  /** The folder to which the file has been saved (DiskStorage) */
  destination: string;
  /** The name of the file within the destination (DiskStorage) */
  filename: string;
  /** Location of the uploaded file (DiskStorage) */
  path: string;
  /** A Buffer of the entire file (MemoryStorage) */
  buffer: Buffer;
}

type Callback = (error: Error | null, acceptFile: boolean) => void;

export function fileFilter(req: any, file: File, callback: Callback) {
  if (!["image/png", "image/jpeg", "image/gif"].includes(file.mimetype)) {
    req.fileValidationError = "Invalid file type";
    return callback(new Error("Invalid file type"), false);
  }

  return callback(null, true);
}
