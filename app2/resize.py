import glob
import cv2 as cv

# for filename in glob.glob("./_data/train/z/*.jpg", recursive=True):
for filepath in glob.glob("./icons/*.jpg", recursive=True):
  x = cv.imread(filepath)
  print(x.shape)
  x = cv.resize(x,(40,40))
  cv.imwrite(filepath,x)
