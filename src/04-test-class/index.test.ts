// Uncomment the code below and write your tests
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 5;
  let classInstance: BankAccount;

  beforeEach(() => {
    classInstance = getBankAccount(initialBalance);
  });
  test('should create account with initial balance', () => {
    expect(classInstance.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const amountWithdraw = 8;
    expect(() => classInstance.withdraw(amountWithdraw)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const amountTransfer = 8;
    let newAcc = getBankAccount(initialBalance);
    expect(() => classInstance.transfer(amountTransfer, newAcc)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const amountTransfer = 4;
    expect(() =>
      classInstance.transfer(amountTransfer, classInstance),
    ).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const amountDeposit = 4;
    const initialBalance = classInstance.getBalance();
    classInstance.deposit(amountDeposit);
    const currentBalance = classInstance.getBalance();
    expect(currentBalance).toBe(initialBalance + amountDeposit);
  });

  test('should withdraw money', () => {
    const amountWithdraw = 4;
    const initialBalance = classInstance.getBalance();
    classInstance.deposit(amountWithdraw);
    const currentBalance = classInstance.getBalance();
    expect(initialBalance).toBe(currentBalance - amountWithdraw);
  });

  test('should transfer money', () => {
    const amountTransfer = 4;
    const newAcc = getBankAccount(0);
    classInstance.transfer(amountTransfer, newAcc);
    expect(newAcc.getBalance()).toBe(amountTransfer);
    expect(classInstance.getBalance()).toBe(initialBalance - amountTransfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    classInstance.fetchBalance = jest.fn().mockResolvedValue(100);
    await expect(classInstance.fetchBalance()).resolves.toEqual(
      expect.any(Number),
    );
  });

  test('should set new balance if fetchBalance returned number', async () => {
    let mockedBalance = 100;
    classInstance.fetchBalance = jest.fn().mockResolvedValue(mockedBalance);
    await classInstance.synchronizeBalance();
    expect(classInstance.getBalance()).toBe(mockedBalance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    classInstance.fetchBalance = jest.fn().mockResolvedValue(null);
    await expect(classInstance.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
