
export default function NamesItem({ name, className }: NamesItemProps) {

    return (
        <p {...{className}}>{name}</p>
    )
}

interface NamesItemProps {
    name: string,
    className: string
}