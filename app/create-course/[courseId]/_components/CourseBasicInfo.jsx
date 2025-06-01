import { Button } from '@/components/ui/button';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiOutlinePuzzle } from "react-icons/hi";
import { HiOutlineRectangleStack } from "react-icons/hi2";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import { supabase } from '@/configs/supabaseConfig';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (course) {
      setSelectedFile(course?.courseBanner)
    }
  }, [course])

  /**
   * Select file and Upload to Supabase Storage
   * @param {*} event 
   */
  const onFileSelected = async (event) => {
    try {
      const file = event.target.files[0];
      setSelectedFile(URL.createObjectURL(file));

      const fileName = `${Date.now()}.jpg`;
      const filePath = `ai-course/${fileName}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('course-images')
        .upload(filePath, file);

      if (error) throw error;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('course-images')
        .getPublicUrl(filePath);

      // Update database with new image URL
      await db.update(CourseList)
        .set({
          courseBanner: publicUrl
        })
        .where(eq(CourseList.id, course?.id));

      console.log('Upload Complete:', publicUrl);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5 relative'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div>
          <h2 className='font-bold text-3xl'>{course?.courseOutput?.course?.name}
            {edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />} </h2>
          <p className='text-sm text-gray-400 mt-3 '>{course?.courseOutput?.course?.description}</p>
          <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><HiOutlineRectangleStack />{course?.category}</h2>
          {!edit && <Link href={'/course/' + course?.courseId + "/start"}>

            <Button className="w-full mt-5">Start</Button>
          </Link>}
          {edit && <Link href={'/course/' + course?.courseId + "/start"}>
            <Button className="w-full mt-5">Start</Button>
          </Link>}

        </div>
        <div>
          <label htmlFor='upload-image'>
            <Image alt="placeholder" src={selectedFile ? selectedFile : '/placeholder.png'} width={300} height={300}
              className='w-full rounded-xl h-[250px] object-cover cursor-pointer' />
          </label>
          {edit && <input type="file" id="upload-image"
            className='opacity-0' onChange={onFileSelected} />}
        </div>
      </div>
    </div>
  )
}

export default CourseBasicInfo