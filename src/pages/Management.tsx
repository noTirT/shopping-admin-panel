import { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import { getItemsAndCategories } from "../context/management/ManagementActions";
import { ManagementContext } from "../context/management/ManagementContext";
import Spinner from "../components/layout/Spinner";
import ArtItemTable from "../components/tables/ArtItemTable";

export function Management() {
    const { setItemsAndCategories, loading } = useContext(ManagementContext);

    useEffect(() => {
        const loadItemsAndCategories = async () => {
            const response = await getItemsAndCategories();
            setItemsAndCategories(response);
        };
        loadItemsAndCategories();
    }, []);

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <Container>
                    <ArtItemTable />
                </Container>
            )}
        </>
    );
}
