import { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Search, Trash, Plus, ChevronsUpDown, Check } from 'lucide-react'

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loader from '@/components/loader'

import api from '@/services/api';
import toast from 'react-hot-toast';
import { BUSINESS_SECTOR, CURRENCY, DOMICILE, NACE_CODE } from '@/services/constants'
import { cn } from '@/utils'

const NaceCode = ({ value, onChange }) => {
    const [open, setOpen] = useState(false)

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} className={`justify-between w-full font-normal ${!value && 'text-[#BDBFC0]'}`}>
            {value ? NACE_CODE.find(nace => nace.name.toLowerCase() === value)?.name : 'Choose an option...'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='p-0 lg:w-[720px] w-max max-h-56 overflow-y-auto'>
          <Command>
            <CommandInput placeholder='Search framework...' />
            <CommandEmpty>No data found</CommandEmpty>
            <CommandGroup>
              {NACE_CODE.slice(0, 20).map((code, i) => (
                <CommandItem
                  key={i}
                  value={code.name}
                  onSelect={currentValue => {
                    onChange(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', value === code.name.toLowerCase() ? 'opacity-100' : 'opacity-0')} />
                  {code.code} - {code.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    )
}

export { NaceCode };