import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  const { createProduct } = useProductStore();
  const toast = useToast();
  const handleAddProduct = async () => {
    const { message } = await createProduct(newProduct);
    toast({ description: message, isClosable: true });
    setNewProduct({ name: "", price: "", image: "" });
  };
  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h2"} size={"2xl"} textAlign={"center"} mb={8} mt={10}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          padding={6}
          rounded={"lg"}
          shadow={"md"}
          bg={useColorModeValue("white", "gray.800")}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product name"
              name="name"
              value={newProduct.name}
              onChange={(e) => {
                setNewProduct({ ...newProduct, name: e.target.value });
              }}
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) => {
                setNewProduct({ ...newProduct, price: e.target.value });
              }}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) => {
                setNewProduct({ ...newProduct, image: e.target.value });
              }}
            />
            <Button colorScheme="blue" w={"full"} onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
