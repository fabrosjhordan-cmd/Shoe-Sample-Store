import dayjs from "dayjs"
import { userOrderTable, type HistoryProps } from "../../types"
import { RiExternalLinkLine } from "react-icons/ri"

export const History = ({user} : HistoryProps) =>{
    return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden gap-8">
        <h1 className="text-4xl font-bold mb-2">Order History</h1>
        <table className="border border-foreground/30">
            <thead>
                <tr className="bg-foreground/10">
                    {userOrderTable.map((headers, key)=>(
                        <th key={key} className="py-2">{headers}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {user.map((userItems, key)=>(
                <tr key={key} className="text-center">
                    <td className="border-x border-foreground/30 px-4 py-3">{dayjs(userItems.created_at).format('MMM. DD YYYY')}</td>
                    <td className="border-x border-foreground/30 px-4 py-3">{userItems.quantity}</td>
                    <td className="border-x border-foreground/30 px-4 py-3">{userItems.status}</td>
                    <td className="border-x border-foreground/30 px-4 py-3"><button><RiExternalLinkLine /></button></td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}