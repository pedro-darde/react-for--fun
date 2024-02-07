import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
export default function Teste() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="border-y-2 p-2">
            e o cão se entrega a tal velocidade
          </CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
