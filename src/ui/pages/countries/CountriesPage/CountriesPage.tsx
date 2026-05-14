import { useState } from 'react';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import useCountries from '../../../../hooks/useCountries.ts';
import useAuth from '../../../../hooks/useAuth.ts';
import type { Country } from '../../../../api/types/country.ts';
import AddCountryDialog from '../../../components/country/AddCountryDialog/AddCountryDialog.tsx';
import EditCountryDialog from '../../../components/country/EditCountryDialog/EditCountryDialog.tsx';
import DeleteCountryDialog from '../../../components/country/DeleteCountryDialog/DeleteCountryDialog.tsx';
const CountriesPage = () => {
    const { countries, loading, error, onAdd, onEdit, onDelete } = useCountries();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const [addOpen, setAddOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [selected, setSelected] = useState<Country | null>(null);

    if (loading) return <CircularProgress/>;
    if (error) return <Typography color='error'>{error.message}</Typography>;

    return (
        <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant='h4'>Countries</Typography>
                {isAdmin && (
                    <Button variant='contained' onClick={() => setAddOpen(true)}>
                        Add Country
                    </Button>
                )}
            </Box>

            <Grid container spacing={2}>
                {countries.map((country) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={country.id}>
                        <Card>
                            <CardActionArea onClick={() => navigate(`/countries/${country.id}`)}>
                                <CardContent>
                                    <Typography variant='h6'>{country.name}</Typography>
                                    <Typography color='text.secondary'>{country.continent}</Typography>
                                </CardContent>
                            </CardActionArea>
                            {isAdmin && (
                                <CardActions>
                                    <Button size='small' onClick={() => { setSelected(country); setEditOpen(true); }}>
                                        Edit
                                    </Button>
                                    <Button size='small' color='error' onClick={() => { setSelected(country); setDeleteOpen(true); }}>
                                        Delete
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <AddCountryDialog open={addOpen} onClose={() => setAddOpen(false)} onAdd={onAdd}/>
            <EditCountryDialog open={editOpen} onClose={() => setEditOpen(false)} onEdit={onEdit} country={selected}/>
            <DeleteCountryDialog open={deleteOpen} onClose={() => setDeleteOpen(false)} onDelete={onDelete} country={selected}/>
        </Box>
    );
};

export default CountriesPage;