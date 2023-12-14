import React, { useState, useRef, Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { MdOutlineModeEdit, MdDeleteOutline } from 'react-icons/md'

import api from '../services/api'
import { AiFillFilePdf } from 'react-icons/ai'

const FileInput = ({ value, onChange, name, folder }) => {
  const [loading, setLoading] = useState(false)
  const inputRef = useRef(null)
  let preview = null

  if (!value) {
    preview = null
  } else if (value.indexOf('.pdf') !== -1) {
    console.log('pdf')
    preview = (
      <div className='absolute top-0 left-0 w-20 h-20 bg-gray-300 opacity-80 hover:opacity-90 flex items-center justify-center cursor-pointer text-[12px] text-black font-normal'>
        <AiFillFilePdf size={48} />
      </div>
    )
  } else {
    preview = <img className='' src={value} alt='user.png' />
  }

  const handleDeleteFile = async () => {
    onChange({ target: { value: '', name } })
  }

  const handleFileChange = async e => {
    setLoading(true)

    const files = []

    const f = e.target.files

    for (let i = 0; i < f.length; i++) {
      const file = f[i]
      const rawBody = await readFileAsync(file)
      files.push({ rawBody, name: file.name })
    }

    const { data } = await api.post(`/file`, { files, folder })

    onChange({ target: { value: data } })
    setLoading(false)
  }

  return (
    <div className='relative w-20 h-20'>
      <input ref={inputRef} id={`openFile-${name}`} type='file' onChange={handleFileChange} className='hidden' />

      {loading ? (
        <div className='w-full h-full flex justify-center items-center'>
          <span>Loading...</span>
        </div>
      ) : (
        <button type='button' className='bg-gray-200 w-full h-full text-xs p-2 flex justify-center items-center' onClick={() => inputRef.current.click()}>
          {preview ? preview : 'Click to upload an image'}
        </button>
      )}

      <div className='absolute top-0 right-0'>
        <Popover className='relative'>
          <Popover.Button className='p-1 group inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900'>
            <div className='p-1 flex items-center justify-center rounded-full bg-gray-100 opacity-60 group-hover:opacity-100'>
              <BiDotsVerticalRounded className='text-lg text-black' />
            </div>
          </Popover.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-200'
            enterFrom='opacity-0 translate-y-1'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in duration-150'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 translate-y-1'
          >
            <Popover.Panel className='absolute left-1/2 z-10 flex w-screen max-w-min -translate-x-1/2 px-4'>
              <div className='flex flex-col w-40 shrink rounded-xl overflow-hidden bg-white text-sm leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5 divide-y divider-gray-200'>
                <label htmlFor={`openFile-${name}`} className='px-3 py-2 w-full hover:bg-gray-50 cursor-pointer'>
                  <div className='flex gap-1 items-center'>
                    <MdOutlineModeEdit />
                    Edit
                  </div>
                </label>
                <button className='px-3 py-2 w-full hover:bg-gray-50 text-left flex gap-1 items-center' onClick={handleDeleteFile}>
                  <MdDeleteOutline />
                  Delete file
                </button>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
      </div>
    </div>
  )
}

export default FileInput

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
