import multer from "multer";

const path = "Images/Product";

const multerConfig = multer.diskStorage({
  destination: (req, file, next) => {
    next(null, path);
  },
  filename: (req, file, next) => {
    const ext = file.mimetype.split("/")[1];
    next(null, `image-${Date.now()}.${ext}`);
  },
});

const isImage = async (req, file, next) => {
  if (file.mimetype.startsWith("image")) {
    next(null, true);
  } else {
    next(new Error("Invalid image type"));
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: isImage,
});

const uploadImage = upload.single("photo");

export default uploadImage;
