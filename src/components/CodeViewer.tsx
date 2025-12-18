import { formatXml } from "../utils/formatXml";
import "./CodeViewe.css";

export const CodeViewer = ({ title, content, type = "json", notiType = "noti" }) => {
  const formatContent = () => {
    try {
      if (type === "json") {
        return JSON.stringify(
          typeof content === "string" ? JSON.parse(content) : content,
          null,
          2
        );
      }

      if (type === "xml") {
        return formatXml(content);
      }

      return content;
    } catch {
      return content;
    }
  };

  return (
    <div className="space-y-2">

      <div className="flex flex-row">
        <span className={`${notiType === 'noti' ? 'bg-emerald-600' : 'bg-violet-600'} w-1 rounded-2xl`}></span>
        <h4 className="text-xs font-semibold uppercase pl-3 textoType">
          {title}
        </h4>
      </div>


      <pre
        className="bg-[#020618] text-[#FFF] text-xs rounded-lg
        p-4 max-h-80 border border-white/10 whitespace-pre
        overflow-auto scrollbar-hide"
      >
        <code>{formatContent()}</code>
      </pre>

    </div>
  );
};
