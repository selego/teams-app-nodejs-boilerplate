import React, { useState, useEffect } from 'react'
import TagsInput from 'react-tagsinput'
import api from '@/services/api'

import 'react-tagsinput/react-tagsinput.css'

export default function PartnerTagSelector({ value = [], onChange, disabled = false, placeholder = 'Search and add users', name = 'user' }) {
  const [tags, setTags] = useState(value.map(tag => tag.user_name))
  const [tagInfo, setTagInfo] = useState(value)
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchUsers() {
      if (search) {
        const { data, ok } = await api.post('/partner/search', { search })
        if (ok) {
          setUsers(data)
        }
      }
    }

    fetchUsers()
  }, [search])

  const handleInputChange = e => {
    setSearch(e.target.value)
  }

  const handleInput = e => {
    const newTag = e.target.value

    // Check if the tag is a valid user and not already in the tags array
    const isTagValid = users.some(user => user.name === newTag)
    const isTagNew = !tags.includes(newTag)

    if (isTagValid && isTagNew) {
      const user = users.find(user => user.name === newTag)

      // Construct the new tag object
      const newTagWithId = { user_id: user._id, user_name: user.name }

      // Update the tags and tagInfo
      const updatedTags = [...tags, newTag]
      const updatedTagInfo = [...tagInfo, newTagWithId]

      setTags(updatedTags)
      setTagInfo(updatedTagInfo)
      onChange(updatedTagInfo)
    }
  }

  const handleTagsChange = newTags => {
    if (newTags.length < tags.length) {
      // Deletion
      const updatedTagInfo = tagInfo.filter(info => newTags.includes(info.user_name))
      setTagInfo(updatedTagInfo)
      setTags(updatedTagInfo.map(info => info.user_name))
      onChange(updatedTagInfo)
    } else {
      // Addition
      const addedTagName = newTags.find(tag => !tags.includes(tag))
      if (addedTagName) {
        const user = users.find(user => user.name === addedTagName)
        if (user) {
          const updatedTagInfo = [...tagInfo, { user_id: user._id, user_name: user.name }]
          setTagInfo(updatedTagInfo)
          setTags(updatedTagInfo.map(info => info.user_name))
          onChange(updatedTagInfo)
          setSearch('')
        }
      }
    }
  }

  return (
    <div className='relative mt-2'>
      <TagsInput
        value={tags}
        addKeys={[9, 13, 188]}
        onlyUnique
        onChange={handleTagsChange}
        inputProps={{
          list: `${name}-list`,
          placeholder: placeholder,
          className:
            'flex h-10 mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#BDBFC0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          onChange: handleInputChange, // Update for search
          onInput: handleInput, // For adding tags
          disabled: disabled
        }}
        className='border-0 bg-none mb-2'
        tagProps={{
          className: 'react-tagsinput-tag h-auto border-0 px-3 py-0.5 bg-black text-white text-xs font-medium rounded inline-flex items-center m-1',
          classNameRemove: 'react-tagsinput-remove text-white text-lg font-normal ml-1.5 cursor-pointer'
        }}
      />
      <datalist id={`${name}-list`}>{renderUserOptions()}</datalist>
    </div>
  )

  function renderUserOptions() {
    return users.map(user => <option key={user._id} value={user.name} />)
  }
}
