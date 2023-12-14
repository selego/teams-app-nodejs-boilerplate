import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/utils'

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, orientation, ...props }, ref) => {
  const classes = cn(
    orientation === 'vertical' ? 'flex flex-col rounded-md bg-muted p-1 text-muted-foreground' : 'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
    className
  );
  return <TabsPrimitive.List ref={ref} className={classes} {...props} />;
});
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef(({ className, orientation, ...props }, ref) => {
  const classes = cn(
    orientation === 'vertical' ? 'flex items-center justify-start whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-state=active:bg-blue-600 data-state=active:text-white data-state=active:font-bold' : 'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
    className
  );
  return <TabsPrimitive.Trigger ref={ref} className={classes} {...props} />;
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn('mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2', className)}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
