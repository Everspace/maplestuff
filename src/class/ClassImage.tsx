import Image from "next/image"
import { FunctionComponent } from "react"
import { classImageData } from "./img/portrait"
import { ClassName } from "./types"

type ClassImageProps = {
  characterClassName: ClassName
}

export const ClassImage: FunctionComponent<ClassImageProps> = ({
  characterClassName,
}) => {
  return <Image layout="responsive" src={classImageData[characterClassName]} />
}
