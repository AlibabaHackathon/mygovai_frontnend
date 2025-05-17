import React from 'react'
import { Flag, FlagIcon } from 'lucide-react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <header className='sticky top-0 backdrop-blur-sm z-20'>
        <div className='py-3 px-10'>
            <div className='flex justify-between items-center'>
                {/*Logo*/}
                <div  className='flex flex-row space-x-2'>
                    <FlagIcon className='fill-black'/>
                    <p className='text-xl font-bold'>MyGovAI</p>
                </div>
                <div>
                    <Button>Learn More</Button>
                </div>
            </div>
            
        </div>
    </header>
  )
}

export default Header
