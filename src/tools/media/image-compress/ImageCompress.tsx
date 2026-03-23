import React, { useState } from 'react';
import './ImageCompress.css';

const ImageCompress: React.FC = () => {
  const [inputImage, setInputImage] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(0.7);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<string>('');
  const [compressedSize, setCompressedSize] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInputImage(file);
      setCompressedImage(null);
      setOriginalSize(`${(file.size / 1024).toFixed(2)} KB`);
      
      // 读取图片尺寸
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setWidth(img.width);
          setHeight(img.height);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompress = () => {
    if (!inputImage) {
      alert('请先上传图片');
      return;
    }

