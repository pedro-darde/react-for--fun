import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function converteObjectToFormData(data: any) {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    const element = data[key]
    if (Array.isArray(element)) {
      element.forEach((value: any, count: number ) => {
        formData.append(`${key}[${count}]`, treaDataToFormData(value))
      })
    } else {
      formData.append(key,treaDataToFormData(element))
    }
  })

  return formData
}

export function treaDataToFormData(value: any) {
  if (typeof value === "object") { 
    if (value instanceof File) {
      return value
    }
    return JSON.stringify(value)
  }
  return value;
}