type PermissionableComponentProps = {
  screenName: string;
  component: JSX.Element;
};
export default function PermissionableComponent({
  component,
  screenName,
}: PermissionableComponentProps) {
  const user = {
    name: "pedro",
    role: "admin",
  };
}
