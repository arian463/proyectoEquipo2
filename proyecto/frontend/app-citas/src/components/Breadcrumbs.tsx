interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav aria-label="breadcrumb" className="text-center text-[2rem] font-bold my-5">
      <ol className="flex justify-center space-x-2">
        {items.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="font-['Roboto_Serif',serif] font-normal text-black">{item.label}</a>
            {index < items.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;