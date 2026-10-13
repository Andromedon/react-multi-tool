import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import {
  Box,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { Product } from '../types/Product';
import {
  getBaseAmountInGrams,
  getProducts,
  getTargetAmount,
} from '../services/converter-service';
import { ProductUnit } from '../types/ProductUnit';
import { ConverterModel } from '../types/ConverterModel';
import { warmGradients } from '../theme';
import ToolHeader from '../components/ToolHeader';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const title = 'Converter';
const rowStyle = {
  margin: '0 0 1rem',
};

const targetAmountRowStyle = {
  minHeight: '56px',
};

const buttonStyle = {
  width: 'fit-content',
  padding: '0.25rem',
};

const buttonRowStyle = {
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '1rem',
};

const emptyConverterModel: ConverterModel = {
  UnitBase: ProductUnit.Grams,
  UnitTarget: ProductUnit.Grams,
  AmountBase: '',
  ProductBaseId: '',
  ProductTargetId: '',
  AmountTarget: [],
};

const Converter = () => {
  useEffect(() => {
    document.title = title;
  });

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  const [converterModel, setConverterModel] =
    useState<ConverterModel>(emptyConverterModel);

  const [resultUnit, setResultUnit] = useState(ProductUnit.Grams);
  const [resultProduct, setResultProduct] = useState('');

  const handleConvert = () => {
    const baseProduct = products.find(
      (p) => p.id === Number(converterModel?.ProductBaseId),
    );
    const targetProduct = products.find(
      (p) => p.id === Number(converterModel.ProductTargetId),
    );

    if (!baseProduct || !targetProduct || !converterModel.AmountBase) {
      return;
    }

    const baseUnitId = Number(converterModel.UnitBase);
    const baseAmountInGrams = getBaseAmountInGrams(
      Number(converterModel.AmountBase),
      baseUnitId,
      baseProduct!,
    );

    const targetAmountInGrams =
      (baseAmountInGrams * baseProduct!.concentration) /
      targetProduct!.concentration;

    const targetAmount = getTargetAmount(
      targetAmountInGrams,
      Number(converterModel.UnitTarget),
      targetProduct,
    );

    setResultUnit(converterModel.UnitTarget);
    setResultProduct(targetProduct.name);
    setConverterModel({
      ...converterModel,
      AmountTarget: Array.from(targetAmount.toFixed(2)),
    });
  };

  const handleReset = () => {
    setConverterModel(emptyConverterModel);
    setResultProduct('');
  };

  return (
    <form className='converter-form' onSubmit={(e) => e.preventDefault()}>
      <ToolHeader title='Converter' description='Find the right amount for your next ingredient swap.' icon={<AutorenewIcon />} />
      <div className='converter-grid'>
        <div className='row' style={rowStyle}>
          <Card sx={{ height: '100%', background: warmGradients.peach }}>
            <CardContent>
              <div className='row' style={rowStyle}>
                <Typography variant='subtitle1' component='h3' sx={{ mb: 1 }}>
                  Converting from:
                </Typography>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography id='base-product-label' variant='subtitle2' component='h4'>
                      Product
                    </Typography>
                    <Select
                      required
                      size='small'
                      labelId='base-product-label'
                      id='base-product'
                      value={converterModel?.ProductBaseId?.toString()}
                      onChange={(event: SelectChangeEvent<string>) => {
                        setConverterModel({
                          ...converterModel,
                          ProductBaseId: event.target.value,
                        });
                      }}
                    >
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl>
                    <Typography id='base-unit-label' variant='subtitle2' component='h3'>
                      Unit
                    </Typography>
                    <RadioGroup
                      row
                      aria-labelledby='base-unit-label'
                      name='base-unit'
                      value={converterModel.UnitBase}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setConverterModel({
                          ...converterModel,
                          UnitBase: Number(event.target.value),
                        });
                      }}
                    >
                      <FormControlLabel
                        value={ProductUnit.Grams}
                        control={<Radio />}
                        label={ProductUnit[ProductUnit.Grams].toLowerCase()}
                      />
                      <FormControlLabel
                        value={ProductUnit.Milliliters}
                        control={<Radio />}
                        label={ProductUnit[
                          ProductUnit.Milliliters
                        ].toLowerCase()}
                      />
                      <FormControlLabel
                        value={ProductUnit.Glasses}
                        control={<Radio />}
                        label={ProductUnit[ProductUnit.Glasses].toLowerCase()}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography variant='subtitle2' component='h3'>
                      Amount
                    </Typography>
                    <TextField
                      required
                      size='small'
                      id='outlined-basic'
                      variant='outlined'
                      value={converterModel?.AmountBase}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setConverterModel({
                          ...converterModel,
                          AmountBase: event.target.value,
                        });
                      }}
                    />
                  </FormControl>
                </Box>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className='row' style={rowStyle}>
          <Card sx={{ height: '100%', background: warmGradients.rose }}>
            <CardContent>
              <div className='row' style={rowStyle}>
                <Typography variant='subtitle1' component='h3' sx={{ mb: 1 }}>
                  Converting to:
                </Typography>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography id='target-product-label' variant='subtitle2' component='h4'>
                      Product
                    </Typography>
                    <Select
                      required
                      size='small'
                      labelId='target-product-label'
                      id='target-product'
                      value={converterModel?.ProductTargetId?.toString()}
                      onChange={(event: SelectChangeEvent<string>) => {
                        setConverterModel({
                          ...converterModel,
                          ProductTargetId: event.target.value,
                        });
                      }}
                    >
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl>
                    <Typography id='target-unit-label' variant='subtitle2' component='h3'>
                      Unit
                    </Typography>
                    <RadioGroup
                      row
                      aria-labelledby='target-unit-label'
                      name='target-unit'
                      value={converterModel.UnitTarget}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        setConverterModel({
                          ...converterModel,
                          UnitTarget: Number(event.target.value),
                        });
                      }}
                    >
                      <FormControlLabel
                        value={ProductUnit.Grams}
                        control={<Radio />}
                        label={ProductUnit[ProductUnit.Grams].toLowerCase()}
                      />
                      <FormControlLabel
                        value={ProductUnit.Milliliters}
                        control={<Radio />}
                        label={ProductUnit[
                          ProductUnit.Milliliters
                        ].toLowerCase()}
                      />
                      <FormControlLabel
                        value={ProductUnit.Glasses}
                        control={<Radio />}
                        label={ProductUnit[ProductUnit.Glasses].toLowerCase()}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </div>
              <div className='row' style={rowStyle}>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography variant='subtitle1' component='h3'>
                      Converted Amount
                    </Typography>
                  </FormControl>
                </Box>
              </div>
              <div className={`result-panel${converterModel.AmountTarget.length ? ' has-result' : ''}`} style={targetAmountRowStyle} aria-live='polite' aria-atomic='true'>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <Typography variant='h3' component='h3' color='secondary.main' sx={{ overflowWrap: 'anywhere' }}>
                      <strong>
                        {converterModel.AmountTarget.join('')}
                      </strong>
                      {converterModel.AmountTarget.length > 0 && (
                        <span className='result-unit'>
                          {resultUnit === ProductUnit.Grams ? 'g' : resultUnit === ProductUnit.Milliliters ? 'ml' : 'glasses'}
                        </span>
                      )}
                    </Typography>
                    <Typography color='text.secondary' sx={{ mt: 1 }}>
                      {converterModel.AmountTarget.length ? `of ${resultProduct}` : 'Your converted amount will appear here.'}
                    </Typography>
                  </FormControl>
                </Box>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className='converter-actions' style={buttonRowStyle}>
          <div style={buttonStyle}>
            <Button
              size='large'
              variant='outlined'
              color='secondary'
              onClick={handleReset}
            >
              Clear
            </Button>
          </div>
          <div style={buttonStyle}>
            <Button
              type='submit'
              size='large'
              variant='contained'
              onClick={handleConvert}
            >
              Convert
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Converter;
